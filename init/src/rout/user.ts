import { user_tpl } from "../view/user.ts";
import { TplToHtml } from "@funxdata/pages/tplstype";

export const user_info = async (cur: String) => {
  const popup_node = document.getElementById("popup") as HTMLElement;
  if (cur === "show") {
    popup_node.innerHTML = user_tpl;
  } else {
    popup_node.innerHTML = "";
  }
};
