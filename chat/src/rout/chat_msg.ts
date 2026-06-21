import { chat_msg_tpl } from "../view/chat_msg.ts";

export const chat_msg_init = () => {
  const chat_content_node = document.getElementById("chat-content");
  chat_content_node.innerHTML = chat_msg_tpl;
};
