// rout/chat_form.ts
import { chat_form_tpl } from "../view/chat_form.ts";
import { sendMessage } from "../apis/cloud.ts";
import { createSession } from "../apis/sessions.ts";
import { generateUUID } from "../utils/uuid.ts";
import { appendMessage } from "./render_msg.ts";
import type { Tpl } from "@funxdata/pages/tplstype";
import type { Message } from "./render_msg.ts";

const TplToHtml = (globalThis as any)["TplToHtml"] as Tpl;

/**
 * 初始化聊天输入框
 * @param uid 会话ID
 */
export const chat_form_init = (uid: string = "") => {
  const footer = document.querySelector("#chat-footer") as HTMLElement;
  if (!footer) return console.warn("[chat_form] #chat-footer 不存在");
  footer.innerHTML = TplToHtml.renderString(chat_form_tpl, { uid });
  bindEvents(footer, uid);
};

function bindEvents(container: HTMLElement, uid: string) {
  const form = container.querySelector(".aui-composer-root") as HTMLFormElement;
  const sendBtn = container.querySelector(".aui-composer-send") as HTMLButtonElement;
  const input = container.querySelector(".aui-lexical-input") as HTMLElement;
  const placeholder = container.querySelector(".aui-lexical-placeholder") as HTMLElement;

  if (!form || !sendBtn || !input) return console.warn("[chat_form] 元素缺失");

  const getText = () => input.innerText?.trim() || "";
  const setBtn = (enabled: boolean) => (sendBtn.disabled = !enabled);
  const updateBtn = () => setBtn(getText().length > 0);
  const showPlaceholder = (show: boolean) => {
    if (placeholder) placeholder.style.display = show ? "block" : "none";
  };
  const clearInput = () => {
    input.innerText = "";
    showPlaceholder(true);
    updateBtn();
  };

  let isSending = false;
  let currentUid = uid;
  const isFirstSend = !uid;

  const handleSend = async () => {
    if (isSending) return;
    const text = getText();
    if (!text) return;

    isSending = true;
    setBtn(false);
    clearInput();

    if (!currentUid) {
      const newId = generateUUID();
      await createSession({
        id: newId,
        title: text.slice(0, 30) || "新对话",
        model_name: "deepseek-ai/DeepSeek-V3.2",
      });
      currentUid = newId;
    }

    // 用户消息
    const userMsg: Message = { role: "user", content: text, messageId: generateUUID() };
    appendMessage(userMsg);

    try {
      const reply = await sendMessage(currentUid, text, {
        stream: false,
        model: "deepseek-ai/DeepSeek-V3.2",
      });
      const assistantMsg: Message = {
        role: "assistant",
        content: reply.content,
        messageId: reply.id,
        duration: reply.usage?.total_tokens
          ? `${(reply.usage.total_tokens / 100).toFixed(2)}s`
          : undefined,
      };
      appendMessage(assistantMsg);
    } catch (err: any) {
      console.error("[chat_form] 发送失败:", err);
      appendMessage({
        role: "assistant",
        content: `❌ 发送失败：${err.message || "未知错误"}`,
        messageId: "error-" + Date.now(),
      });
    } finally {
      isSending = false;
      if (!isFirstSend) {
        updateBtn();
        input.focus();
      }
    }

    if (isFirstSend && currentUid) {
      location.href = `http://192.168.1.8:8864/chat?uid=${currentUid}`;
    }
  };

  // 事件绑定
  input.addEventListener("focus", () => showPlaceholder(!getText()));
  input.addEventListener("input", () => {
    const has = getText().length > 0;
    setBtn(has);
    showPlaceholder(!has);
  });
  input.addEventListener("keydown", (e) => {
    if (e.isComposing) return;
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  });
  sendBtn.addEventListener("click", handleSend);
  form.addEventListener("submit", (e) => e.preventDefault());
  input.addEventListener("blur", () => {
    if (!getText()) showPlaceholder(true);
  });

  // 初始状态
  const initText = getText();
  setBtn(initText.length > 0);
  showPlaceholder(initText.length === 0);
  input.focus();
}