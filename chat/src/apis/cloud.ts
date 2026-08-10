// src/apis/cloud.ts
// 云端 LLM 调用（SiliconFlow），自动与本地数据库结合

import { createMessage, updateMessageContent, updateMessageStatus, getMessagesBySession } from "./messages.ts";
import { createSession, getSessionById } from "./sessions.ts";
// 若需要使用 prompts，可导入，此处暂未使用，但保留以备后续
// import { getPrompts } from "./prompts.ts";

// ---------- 配置 ----------
// 请从环境变量或配置文件中读取
const SILICONFLOW_API_KEY = "sk-qwkykrceydpchxfptbuhdgtvtuapmazzatmaygflwukjjflt";   // 替换为真实 key
const SILICONFLOW_BASE_URL = "https://api.siliconflow.cn/v1/chat/completions";

/**
 * 调用云端聊天补全，并自动保存到本地数据库
 * @param params 请求参数
 * @param params.sessionId 会话ID（若不存在则新建）
 * @param params.messages 消息数组（符合 OpenAI 格式）
 * @param params.model 模型名称，默认 "Pro/zai-org/GLM-4.7"
 * @param params.stream 是否流式，默认 false
 * @param params.temperature 温度，默认 0.7
 * @param params.top_p 核采样，默认 0.9
 * @param params.max_tokens 最大生成 token 数，默认 2048
 * @param params.enable_thinking 是否启用思考模式（仅部分模型）
 * @param params.thinking_budget 思考 token 预算（reasoning 模型）
 * @param params.otherParams 其他参数（如 stop, frequency_penalty 等）
 * @returns 返回 AI 回复的完整消息对象（如果流式则返回最终组装后的消息）
 */
export async function chatCompletion(params: {
  sessionId?: string;
  messages: Array<{ role: "system" | "user" | "assistant" | "tool"; content: string }>;
  model?: string;
  stream?: boolean;
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  enable_thinking?: boolean;
  thinking_budget?: number;
  [key: string]: any; // 其他参数
}) {
  const {
    sessionId: providedSessionId,
    messages: inputMessages,
    model = "deepseek-ai/DeepSeek-V3.2",
    stream = false,
    temperature = 0.7,
    top_p = 0.9,
    max_tokens = 2048,
    enable_thinking,
    thinking_budget,
    ...extraParams
  } = params;

  // 1. 处理会话：如果没有传入 sessionId，则自动创建新会话
  let sessionId = providedSessionId;
  if (!sessionId) {
    const newId = crypto.randomUUID();
    // 从消息中提取第一条用户消息作为标题
    const firstUserMsg = inputMessages.find(m => m.role === "user");
    const title = firstUserMsg ? firstUserMsg.content.slice(0, 30) : "新对话";
    await createSession({
      id: newId,
      title,
      model_name: model,
      system_prompt: inputMessages.find(m => m.role === "system")?.content || "",
    });
    sessionId = newId;
    console.log(`[cloud] 新建会话: ${sessionId}`);
  } else {
    // 检查会话是否存在
    const exists = await getSessionById(sessionId);
    if (!exists) {
      throw new Error(`会话 ${sessionId} 不存在`);
    }
  }

  // 2. 准备云端请求体
  const requestBody: any = {
    model,
    messages: inputMessages,
    stream,
    temperature,
    top_p,
    max_tokens,
    ...extraParams,
  };
  if (enable_thinking !== undefined) requestBody.enable_thinking = enable_thinking;
  if (thinking_budget !== undefined) requestBody.thinking_budget = thinking_budget;

  // 3. 调用云端 API
  const response = await fetch(SILICONFLOW_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SILICONFLOW_API_KEY}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Cloud API error (${response.status}): ${errorText}`);
  }

  // 4. 保存用户消息（仅保存本次传入的最后一条 user 消息，避免重复保存历史）
  //    通常调用方传入完整历史，但本地存储已存在，这里只存新用户消息（如果调用方传入完整历史，容易重复）
  //    更合理：调用方只传新的一条 user 消息，但我们灵活处理：若输入消息数量大于当前已存消息数，则只存最新的 user 消息
  //    简便做法：我们约定调用方传入的 messages 只包含当前需要发送的新消息（不含历史），但为了通用，我们通过查询已存消息来去重。
  //    这里简化：如果 sessionId 已存在，我们只存储最后一条 user 消息（如果它有内容）
  const lastUserMsg = inputMessages.filter(m => m.role === "user").pop();
  if (lastUserMsg) {
    // 检查是否已存在相同内容的消息（防止重复提交）
    const existingMessages = await getMessagesBySession(sessionId);
    // deno-lint-ignore no-explicit-any
    const duplicate = existingMessages.some((m:any) => m.role === "user" && m.content === lastUserMsg.content);
    if (!duplicate) {
      await createMessage({
        id: crypto.randomUUID(),
        session_id: sessionId,
        role: "user",
        content: lastUserMsg.content,
      });
    }
  }

  // 5. 处理响应（流式或非流式）
  if (stream) {
    // 流式响应
    const reader = response.body?.getReader();
    if (!reader) throw new Error("No response body");
    const decoder = new TextDecoder();
    let buffer = "";
    let assistantMessage = "";
    let reasoningContent = "";
    let messageId = crypto.randomUUID();

    // 先创建一个待完成的 assistant 消息（状态为 pending）
    await createMessage({
      id: messageId,
      session_id: sessionId,
      role: "assistant",
      content: "",
      metadata: { reasoning_content: "" },
      status: "pending",
    });

    // 读取流
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const payload = line.slice(6);
          if (payload === "[DONE]") continue;
          try {
            const json = JSON.parse(payload);
            const delta = json.choices?.[0]?.delta;
            if (delta?.content) {
              assistantMessage += delta.content;
            }
            if (delta?.reasoning_content) {
              reasoningContent += delta.reasoning_content;
            }
            // 实时更新消息内容（可考虑批量更新，这里每收到一次更新都更新数据库）
            await updateMessageContent(messageId, assistantMessage);
            // 由于 updateMessageContent 不支持 metadata，我们不在流中更新 reasoning，待结束后再处理
          } catch (e) {
            console.warn("Parse SSE error:", e);
          }
        }
      }
    }

    // 流结束，更新最终状态
    await updateMessageStatus(messageId, "completed");
    // TODO: 若需要保存 reasoning_content 到 metadata，可扩展 messages.ts 添加 updateMessageMetadata 函数
    // 目前仅打印
    if (reasoningContent) {
      console.log(`[cloud] reasoning: ${reasoningContent.slice(0, 100)}...`);
    }

    console.log(`[cloud] 流式完成，消息ID: ${messageId}`);
    // 返回最终消息对象
    return {
      id: messageId,
      role: "assistant",
      content: assistantMessage,
      reasoning_content: reasoningContent,
      session_id: sessionId,
    };
  } else {
    // 非流式
    const json = await response.json();
    const choice = json.choices?.[0];
    if (!choice) throw new Error("No choice in response");
    const assistantMsg = choice.message || {};
    const content = assistantMsg.content || "";
    const reasoning = assistantMsg.reasoning_content || "";

    // 保存 assistant 回复
    const messageId = crypto.randomUUID();
    await createMessage({
      id: messageId,
      session_id: sessionId,
      role: "assistant",
      content,
      metadata: { reasoning_content: reasoning },
      prompt_tokens: json.usage?.prompt_tokens || 0,
      completion_tokens: json.usage?.completion_tokens || 0,
      total_tokens: json.usage?.total_tokens || 0,
      status: "completed",
    });

    return {
      id: messageId,
      role: "assistant",
      content,
      reasoning_content: reasoning,
      session_id: sessionId,
      usage: json.usage,
    };
  }
}

/**
 * 快捷函数：发送新消息，自动携带历史上下文
 * @param sessionId 会话ID
 * @param userContent 用户输入
 * @param options 其他参数（model, stream, etc.）
 * @returns 返回 AI 回复
 */
export async function sendMessage(
  sessionId: string,
  userContent: string,
  options?: Partial<Omit<Parameters<typeof chatCompletion>[0], "sessionId" | "messages">>
) {
  // 获取历史消息（最多取最近 20 条，或全部）
  const history = await getMessagesBySession(sessionId);
  // 将历史转换为消息格式
  const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [];

  // 若会话有 system_prompt，放在最前面
  const session = await getSessionById(sessionId);
  if (session?.system_prompt) {
    messages.push({ role: "system", content: session.system_prompt });
  }

  // 添加历史消息（只取 user/assistant）
  for (const msg of history) {
    if (msg.role === "user" || msg.role === "assistant") {
      messages.push({ role: msg.role, content: msg.content });
    }
  }

  // 添加当前用户输入
  messages.push({ role: "user", content: userContent });

  // 调用云端
  return chatCompletion({
    sessionId,
    messages,
    ...options,
  });
}