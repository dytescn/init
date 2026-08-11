// rout/header.ts
import { header_tpl } from "../view/header.ts";
import { getSessionById } from "../apis/sessions.ts";
import type { Tpl } from "@funxdata/pages/tplstype";

const TplToHtml = (globalThis as any)["TplToHtml"] as Tpl;

export const header_init = async (uid: string) => {
  const chat_header_node = document.getElementById("chat-header") as HTMLElement;
  if (!chat_header_node) return;

  // 默认标题（先显示占位，避免白屏）
  let title = uid ? "加载中..." : "新对话";
  chat_header_node.innerHTML = TplToHtml.renderString(header_tpl, { title });

  // 如果有 uid，从 API 获取真实标题
  if (uid) {
    try {
      const session = await getSessionById(uid);
      if (session?.title) {
        title = session.title;
        // 更新标题
        chat_header_node.innerHTML = TplToHtml.renderString(header_tpl, { title });
      }
    } catch (error) {
      console.error("[header_init] 获取会话标题失败:", error);
      // 失败时保留占位或显示默认标题
      chat_header_node.innerHTML = TplToHtml.renderString(header_tpl, { title: "未命名会话" });
    }
  }

  // ---------- 侧边栏切换逻辑 ----------
  const sidebar = document.getElementById("chat-slidebar") as HTMLElement;
  if (!sidebar) return;

  const panelBtn = chat_header_node.querySelector(".lucide-panel-left")?.closest("button") as HTMLButtonElement | null;
  const menuBtn = chat_header_node.querySelector(".lucide-menu")?.closest("button") as HTMLButtonElement | null;

  const toggleSidebar = () => {
    sidebar.classList.toggle("hidden");
  };

  panelBtn?.addEventListener("click", toggleSidebar);
  menuBtn?.addEventListener("click", toggleSidebar);
};