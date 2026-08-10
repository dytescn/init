import { app_tpl } from "./view/app.ts";
import { init_slidebar } from "./rout/slidebar.ts";
import { header_init } from "./rout/header.ts";
import { chat_msg_init } from "./rout/chat_msg.ts";
import { chat_form_init } from "./rout/chat_form.ts";
import { marked } from "../assets/marked.js";

const app_node = document.getElementById("app") as HTMLElement;
app_node.innerHTML = app_tpl;

const uid = new URLSearchParams(globalThis.location.search).get('uid') || '';

init_slidebar(uid);
header_init();
chat_msg_init(uid);
chat_form_init(uid);


// 使用全局变量
// declare const marked: any;
// declare const DOMPurify: any;

// 或者通过 window 访问
