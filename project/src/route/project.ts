import type { Tpl } from "@funxdata/pages/tplstype";
import { project_card_tpl } from "../view/project.ts";
import { project_list } from "../apis/project.ts";
// deno-lint-ignore no-explicit-any
const TplToHtml = (globalThis as any)["TplToHtml"] as Tpl;

export const project_init = async () => {
  const project_node = document.getElementById("project_all");
  const reqData = await project_list();
  const project_html = await TplToHtml.renderString(project_card_tpl, {
    "projects": reqData.data,
  });
  console.log(reqData.data);
  if (project_node) {
    project_node.insertAdjacentHTML("beforeend", project_html);
  }
};
