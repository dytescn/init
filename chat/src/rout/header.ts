import { header_tpl } from "../view/header.ts";

export const header_init = () => {
  const chat_header_node = document.getElementById("chat-header") as HTMLElement;
  chat_header_node.innerHTML = header_tpl;

  const sidebar = document.getElementById("chat-slidebar") as HTMLElement;

  // 获取两个按钮
  const panelBtn = chat_header_node.querySelector(".lucide-panel-left")?.closest("button") as HTMLButtonElement | null;
  const menuBtn = chat_header_node.querySelector(".lucide-menu")?.closest("button") as HTMLButtonElement | null;

  const toggleSidebar = () => {
      sidebar.classList.toggle("hidden");
  };

  panelBtn?.addEventListener("click", toggleSidebar);
  menuBtn?.addEventListener("click", toggleSidebar);
};
