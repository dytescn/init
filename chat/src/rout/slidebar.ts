import { slidebar_tpl } from "../view/slidebar.ts";

export const init_slidebar = () => {
  const slidebar_node = document.getElementById("chat-slidebar");
  const slidebar_info_node = slidebar_node.querySelector(".chat-slidebar-info");

  // console.log(slidebar_tpl);
  slidebar_info_node.innerHTML = slidebar_tpl;
};
