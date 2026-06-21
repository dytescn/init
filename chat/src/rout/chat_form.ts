import { chat_form_tpl } from "../view/chat_form.ts";

export const chat_form_init = () => {
  const chat_footer_node = document.querySelector(
    "#chat-footer",
  ) as HTMLFormElement;
  chat_footer_node.innerHTML = chat_form_tpl;
};
