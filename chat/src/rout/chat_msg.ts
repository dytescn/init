// init/chat_msg_init.ts

import { chat_msg_tpl, user_msg_tpl, assistant_msg_tpl } from "../view/chat_msg.ts";

// 定义消息类型
interface Message {
  role: "user" | "assistant";
  content: string;
  messageId: string;
  duration?: string; // 仅 assistant 需要
  branchIndex?: number;
  branchTotal?: number;
}

export const chat_msg_init = (uid:string) => {
  if(uid==""){
    return;
  }
  const chat_content_node = document.getElementById("chat-content") as HTMLElement;
  if (!chat_content_node) return;

  // 模拟数据：对话列表
  const mock_messages: Message[] = [
    {
      role: "user",
      content: "hello",
      messageId: "3Rrw00FbJE2Icua9",
      branchIndex: 1,
      branchTotal: 2,
    },
    {
      role: "assistant",
      content: `<p class="aui-md-p my-3 leading-relaxed first:mt-0 last:mb-0">Hi! 👋 How can I help you today?</p>`,
      messageId: "Udguw4BHLct6GsNn",
      duration: "0.85s",
    },
    {
      role: "user",
      content: "生成一点代码",
      messageId: "ZBr2m8nT345FSwjg",
      branchIndex: 1,
      branchTotal: 2,
    },
    {
      role: "assistant",
      content: `
        <p class="aui-md-p my-3 leading-relaxed first:mt-0 last:mb-0">当然可以。你想要哪种代码？比如：</p>
        <ol class="aui-md-ol marker:text-muted-foreground my-3 ms-5 list-decimal [&>li]:mt-1">
          <li class="aui-md-li leading-relaxed">前端（HTML/CSS/JavaScript，React/Vue）</li>
          <li class="aui-md-li leading-relaxed">后端（Python/Java/Node.js）</li>
          <li class="aui-md-li leading-relaxed">数据/脚本（爬虫、文件处理、自动化）</li>
          <li class="aui-md-li leading-relaxed">算法/LeetCode（某题思路）</li>
          <li class="aui-md-li leading-relaxed">其它（说明需求 + 语言）</li>
        </ol>
        <p class="aui-md-p my-3 leading-relaxed first:mt-0 last:mb-0">把下面三样发我，我就能直接给你可运行的示例代码：</p>
        <ul class="aui-md-ul marker:text-muted-foreground my-3 ms-5 list-disc [&>li]:mt-1">
          <li class="aui-md-li leading-relaxed"><strong class="aui-md-strong font-semibold">语言/框架</strong>：例如 Python 或 JavaScript</li>
          <li class="aui-md-li leading-relaxed"><strong class="aui-md-strong font-semibold">功能需求</strong>：你要实现什么</li>
          <li class="aui-md-li leading-relaxed"><strong class="aui-md-strong font-semibold">输入/输出</strong>：例如“输入一个数字，输出阶乘结果”或“读取一个CSV并生成报表”</li>
        </ul>
      `,
      messageId: "o2DCAqmCVCDBaNBM",
      duration: "1.03s",
    },
  ];

  // 构建 HTML 字符串
  let messages_html = "";

  mock_messages.forEach((msg) => {
    if (msg.role === "user") {
      // 使用 user_msg_tpl，替换占位符
      let user_html = user_msg_tpl
        .replace("${messageId}", msg.messageId)
        .replace("${content}", msg.content)
        .replace("${branchIndex}", String(msg.branchIndex ?? 1))
        .replace("${branchTotal}", String(msg.branchTotal ?? 1));
      messages_html += user_html;
    } else {
      // 使用 assistant_msg_tpl，替换占位符
      let assistant_html = assistant_msg_tpl
        .replace("${messageId}", msg.messageId)
        .replace("${content}", msg.content)
        .replace("${duration}", msg.duration ?? "");
      messages_html += assistant_html;
    }
  });

  // 将消息列表嵌入外层容器
  const final_html = chat_msg_tpl.replace("${messages}", messages_html);
  chat_content_node.innerHTML = final_html;
};