import { renderInitMessage } from "./render_msg.ts";
import { getMessagesBySessionWithLimit } from "../apis/messages.ts";

export const chat_msg_init = async (uid: string) => {
  if (!uid) return null;
  try {
    const rows = await getMessagesBySessionWithLimit(uid, 10);
    renderInitMessage(rows);
  } catch (err) {
    console.error("[chat_msg_init] 加载失败:", err);
  }
};