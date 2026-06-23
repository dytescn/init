import type { Tpl } from "@funxdata/pages/tplstype";
import { asides_tpl } from "../view/asides.ts";
import { get_asides_info } from "../apis/route.ts";
import { user_info } from "./user.ts";
// deno-lint-ignore no-explicit-any
const TplToHtml = (globalThis as any)["TplToHtml"] as Tpl;

export const aside_init = async () => {
  const asides_info = await get_asides_info();
  console.log(asides_info);
  const aside_node = document.getElementById("asides") as HTMLElement;
  aside_node.innerHTML = await TplToHtml.renderString(asides_tpl, {
    "asides": asides_info,
  });
  const user_info_btn = aside_node.querySelector(
    "#user-info-btn",
  ) as HTMLElement;
  user_info_btn.addEventListener("click", (event: Event) => {
    const toggleAction = user_info_btn.dataset.toggle; // 此时获取到的是 "hide"
    if (toggleAction === "hide") {
      user_info_btn.dataset.toggle = "show";
      user_info("show");
    } else {
      user_info_btn.dataset.toggle = "hide";
      user_info("hide");
    }
  });
};
