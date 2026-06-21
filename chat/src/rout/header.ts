import { header_tpl } from "../view/header.ts";

export const header_init = () => {
  const chat_header_node = document.getElementById("chat-header");
  chat_header_node.innerHTML = header_tpl;
};
