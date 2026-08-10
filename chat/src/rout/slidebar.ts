import { slidebar_tpl } from "../view/slidebar.ts";
import { getSessions, createSession, deleteSession } from "../apis/sessions.ts";
import type { Tpl } from "@funxdata/pages/tplstype";

const TplToHtml = (globalThis as any)["TplToHtml"] as Tpl;

export const init_slidebar = async (uid:string) => {
  const slidebar_node = document.getElementById("chat-slidebar") as HTMLElement;
  const slidebar_info_node = slidebar_node.querySelector(".chat-slidebar-info") as HTMLElement;

     const sessions = await getSessions();
    // 传入 { sessions }，模板中使用 it.sessions
    const html = await TplToHtml.renderString(slidebar_tpl, { sessions });
    slidebar_info_node.innerHTML = html;
  // console.log(slidebar_tpl);
};
