import { create_project_tpl } from "../view/create.ts";

export const create_project = () => {
  const popup_node = document.getElementById("popup");
  if (popup_node) {
    popup_node.innerHTML = create_project_tpl;
  }
  cancel_project(popup_node as HTMLElement);
};

const cancel_project = (node: HTMLElement) => {
  const cancel_btn = node.querySelector("#cancel");
  if (cancel_btn) {
    cancel_btn.addEventListener("click", () => {
      node.innerHTML = "";
    });
  }
};

const submit_project = (node: HTMLElement) => {
  const submit_btn = node.querySelector("#define");
  if (submit_btn) {
    submit_btn.addEventListener("click", () => {
    })
   }
};
