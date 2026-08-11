// rout/slidebar.ts
import { slidebar_tpl } from "../view/slidebar.ts";
import { getSessions } from "../apis/sessions.ts";
import type { Tpl } from "@funxdata/pages/tplstype";
import { getDateLabel } from "../utils/time.ts";

// deno-lint-ignore no-explicit-any
const TplToHtml = (globalThis as any)["TplToHtml"] as Tpl;

export const init_slidebar = async (uid: string) => {
  const slidebar_node = document.getElementById("chat-slidebar") as HTMLElement;
  if (!slidebar_node) return;

  const slidebar_info_node = slidebar_node.querySelector(".chat-slidebar-info") as HTMLElement;
  if (!slidebar_info_node) return;

  // deno-lint-ignore no-explicit-any
  let sessions: any[] = [];
  try {
    sessions = await getSessions(false);
  } catch (err) {
    console.error("[slidebar] 获取会话列表失败:", err);
  }

  // deno-lint-ignore no-explicit-any
  const groupMap: Record<string, any[]> = {};
  sessions.forEach(session => {
    const label = getDateLabel(session.created_at || session.updated_at);
    if (!groupMap[label]) groupMap[label] = [];
    groupMap[label].push(session);
  });

const order = ["今天", "昨天", "本周", "本月", "更早"];
  const groups = order
    .filter(label => groupMap[label] && groupMap[label].length > 0)
    .map(label => ({ label, sessions: groupMap[label] }));

  const html = TplToHtml.renderString(slidebar_tpl, { groups, currentUid: uid });
  slidebar_info_node.innerHTML = html;
};