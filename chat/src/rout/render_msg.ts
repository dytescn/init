// rout/render_msg.ts
import { user_msg_tpl, assistant_msg_tpl } from "../view/chat_msg.ts";
import type { Tpl } from "@funxdata/pages/tplstype";

// deno-lint-ignore no-explicit-any
const TplToHtml = (globalThis as any)["TplToHtml"] as Tpl;
// deno-lint-ignore no-explicit-any
const marked =  (globalThis as any).marked


// ---------- 消息类型 ----------
export interface Message {
  role: "user" | "assistant";
  content: string;
  messageId: string;
  duration?: string;
}

const getMessageContainer = (): HTMLElement => {
  const parent = document.getElementById("chat-content");
  if (!parent) throw new Error("#chat-content 不存在");

  // 确保父容器是 flex 子项，并占据剩余空间
  if (!parent.style.flex) {
    parent.style.flex = "1";           // 占用剩余空间
    parent.style.display = "flex";
    parent.style.flexDirection = "column";
    parent.style.overflowY = "auto";
    // 可选：设置最小高度，确保即使内容很少也有一定高度
    parent.style.minHeight = "calc(100vh - 360px)"; // 减去 footer 高度（需根据实际调整）
  }

  let container = parent.querySelector(".aui-message-list") as HTMLElement;
  if (!container) {
    container = document.createElement("div");
    container.className = "aui-message-list flex flex-col gap-y-6";
    container.dataset.slot = "aui_message-group";
    parent.appendChild(container);
  }
  return container;
};

// ---------- 渲染单条消息 ----------
export const renderMessage = (msg: Message): string=> {
  const rawHtml = marked.parse(msg.content);
  const tpl = msg.role === "user" ? user_msg_tpl : assistant_msg_tpl;
  const data = {
    messageId: msg.messageId,
    content: rawHtml || "",
    duration: msg.duration || "",
  };
  return TplToHtml.renderString(tpl, data);
}

// ---------- 第一次渲染初始化内容（批量插入） ----------
export const renderInitMessage = (rows: any[]) => {
  const container = getMessageContainer();
  // 清空容器
  container.innerHTML = "";
  // 转换数据
  const messages: Message[] = rows.map((row: any) => ({
    role: row.role,
    content: row.content,
    messageId: row.id,
    duration: (() => {
      try {
        const meta = typeof row.metadata === "string" ? JSON.parse(row.metadata) : row.metadata;
        return meta?.duration || undefined;
      } catch {
        return undefined;
      }
    })(),
  }));
  // 批量追加
  messages.forEach((msg) => {
    const html = renderMessage(msg);
    container.insertAdjacentHTML("beforeend", html);
  });
  // 滚动到底部 - 使用 #chat-content
  const viewport = document.getElementById("chat-content");
  if (viewport) {
    requestAnimationFrame(() => {
      viewport.scrollTop = viewport.scrollHeight;
    });
  }
};
// ---------- 向后插入（追加到末尾，用于新消息） ----------
export const appendMessage = (msg: Message)=> {
  const container = getMessageContainer();
  const html = renderMessage(msg);
  container.insertAdjacentHTML("beforeend", html);
  // 滚动到底部
  const viewport = document.querySelector('[data-slot="aui_thread-viewport"]');
  if (viewport) requestAnimationFrame(() => (viewport.scrollTop = viewport.scrollHeight));
}

// ---------- 向前插入（用于加载更早的消息） ----------
export const prependMessage = (msg: Message) => {
  const container = getMessageContainer();
  const html = renderMessage(msg);
  const first = container.firstElementChild;
  if (first) {
    first.insertAdjacentHTML("beforebegin", html);
  } else {
    container.insertAdjacentHTML("beforeend", html);
  }
}