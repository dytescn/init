import { project_card_tpl } from "../view/project.ts";
export const project_init = () => {
  const project_node = document.getElementById("project_all");
  if (project_node) {
    project_node.insertAdjacentHTML("beforeend", project_card_tpl);
  }
};
