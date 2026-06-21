import { app_tpl } from "./view/app.ts";
import { init_slidebar } from "./rout/slidebar.ts";
import { header_init } from "./rout/header.ts";
import { chat_msg_init } from "./rout/chat_msg.ts";
import { chat_form_init } from "./rout/chat_form.ts";

const app_node = document.getElementById("app") as HTMLElement;
app_node.innerHTML = app_tpl;
init_slidebar();
header_init();
chat_msg_init();
chat_form_init();
