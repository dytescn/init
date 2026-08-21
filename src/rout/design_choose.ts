// src/rout/design.ts
import { icon_default, getDesignIcon } from "../view/designicons.ts";
import { design_choose_tpl } from "../view/designsoft.ts";
import type { Tpl } from "@funxdata/pages/tplstype";
import { getSoftwareList } from "../apis/designdb.ts";
import { startSoftware } from "../apis/designsoft.ts"; // 导入启动函数

// deno-lint-ignore no-explicit-any
const TplToHtml = (globalThis as any)["TplToHtml"] as Tpl;

export const init_design_soft = () => {
  const setting_info_node = document.getElementById("all-setting-info") as HTMLElement;
  const design_choose_node = document.getElementById("design-soft-info") as HTMLElement;
  design_choose_node.innerHTML = icon_default;

  design_choose_node.addEventListener("click", (event: Event) => {
    const toggleAction = setting_info_node.dataset.toggle; // "hide" / "show"
    if (toggleAction === "hide") {
      setting_info_node.dataset.toggle = "show";
      design_info("show");
    } else {
      setting_info_node.dataset.toggle = "hide";
      design_info("hide");
    }
  });
};

export const design_info = async (cur: string) => {
  const popup_node = document.getElementById("popup") as HTMLElement;
  const setting_info_node = document.getElementById("all-setting-info") as HTMLElement;
  const design_choose_node = document.getElementById("design-soft-info") as HTMLElement;

  if (cur === "show") {
    // 获取软件列表
    const design_info = await getSoftwareList();
    const designsofts = design_info.map(item => ({
      ...item,
      icon: getDesignIcon(item.name)
    }));

    // 渲染下拉菜单
    popup_node.innerHTML = await TplToHtml.renderString(design_choose_tpl, { designsofts });

    // 绑定每个软件项的点击事件
    popup_node.querySelectorAll(".design-soft-item").forEach((itemEl) => {
      itemEl.addEventListener("click", async (e) => {
        e.preventDefault();
        const name = itemEl.getAttribute("data-name") || "";
        const version = itemEl.getAttribute("data-version") || "";

        try {
          // 启动软件（传递版本号，确保精准启动）
          await startSoftware(name, version);
          // 更新顶部图标为该软件的专属图标
          design_choose_node.innerHTML = getDesignIcon(name);
          // 关闭弹框
          setting_info_node.dataset.toggle = "hide";
          popup_node.innerHTML = "";
        } catch (err) {
          console.error("启动失败:", err);
          // 可替换为自定义对话框
          alert("启动失败，请确认软件已安装。");
        }
      });
    });
  } else {
    // 隐藏弹框
    popup_node.innerHTML = "";
  }
};