import { create_project_tpl } from "../view/create.ts";
import { project_insert } from "../apis/insert.ts";

export const create_project = () => {
  const popup_node = document.getElementById("popup");
  if (popup_node) {
    popup_node.innerHTML = create_project_tpl;
    // 显示弹窗
    popup_node.style.display = 'block';
    
    // 绑定取消事件
    cancel_project(popup_node as HTMLElement);
    // 绑定提交事件
    submit_project(popup_node as HTMLElement);
    // 绑定回车键提交
    bindEnterKey(popup_node as HTMLElement);
    // 自动聚焦到输入框
    autoFocus(popup_node as HTMLElement);
  }
};

// 取消项目创建
const cancel_project = (node: HTMLElement) => {
  const cancel_btn = node.querySelector("#cancel");
  if (cancel_btn) {
    cancel_btn.addEventListener("click", () => {
      closePopup(node);
    });
  }
  
  // 点击遮罩层关闭
  const overlay = node.querySelector(".vg-dialog-box");
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closePopup(node);
      }
    });
  }
};

// 提交项目创建
const submit_project = (node: HTMLElement) => {
  const submit_btn = node.querySelector("#define");
  if (submit_btn) {
    submit_btn.addEventListener("click", async () => {
      await handleSubmit(node);
    });
  }
};

// 绑定回车键
const bindEnterKey = (node: HTMLElement) => {
  const input = node.querySelector("#project_name") as HTMLInputElement;
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit(node);
      }
    });
  }
};

// 自动聚焦
const autoFocus = (node: HTMLElement) => {
  const input = node.querySelector("#project_name") as HTMLInputElement;
  if (input) {
    setTimeout(() => input.focus(), 100);
  }
};

// 处理提交逻辑
const handleSubmit = async (node: HTMLElement) => {
  const input = node.querySelector("#project_name") as HTMLInputElement;
  const errorTip = node.querySelector(".error-tip") as HTMLElement;
  
  // 1. 清空之前的错误提示
  clearError(errorTip);
  
  // 2. 获取并验证项目名称
  const projectName = input?.value?.trim() || '';
  const validation = validateProjectName(projectName);
  
  if (!validation.valid) {
    showError(errorTip, validation.message);
    if (input) {
      input.focus();
      input.select();
    }
    return;
  }
  
  // 3. 禁用提交按钮，防止重复提交
  const submitBtn = node.querySelector("#define") as HTMLButtonElement;
  submitBtn.disabled = true;
  submitBtn.textContent = "创建中...";
  
  try {
    // 4. 调用 API 创建项目
    const result = await project_insert({
      name: projectName,
      // 可以添加其他必要字段
      // created_at: new Date().toISOString()
    });
    
    // 5. 处理成功
    if (result.success) {
      showSuccessTip(node, "项目创建成功！");
      // 延迟关闭弹窗，让用户看到成功提示
      setTimeout(() => {
        closePopup(node);
        // 触发自定义事件，通知其他模块刷新列表
        window.dispatchEvent(new CustomEvent('project-created', { 
          detail: { projectName, data: result.data } 
        }));
      }, 500);
    } else {
      // 6. 处理 API 返回的错误
      showError(errorTip, result.message || "创建失败，请稍后重试");
      submitBtn.disabled = false;
      submitBtn.textContent = "确定";
    }
  } catch (error) {
    // 7. 处理网络错误
    console.error("创建项目失败:", error);
    showError(errorTip, "网络错误，请检查连接后重试");
    submitBtn.disabled = false;
    submitBtn.textContent = "确定";
  }
};

// 验证项目名称
const validateProjectName = (name: string): { valid: boolean; message: string } => {
  if (!name) {
    return { valid: false, message: "请输入项目名称" };
  }
  
  if (name.length < 2) {
    return { valid: false, message: "项目名称至少需要2个字符" };
  }
  
  if (name.length > 50) {
    return { valid: false, message: "项目名称不能超过50个字符" };
  }
  
  // 检查是否包含特殊字符（可根据需求调整）
  const invalidChars = /[<>\"\'\/\\\|\:\*\?]/;
  if (invalidChars.test(name)) {
    return { valid: false, message: "项目名称包含非法字符" };
  }
  
  return { valid: true, message: "" };
};

// 显示错误提示
const showError = (errorTip: HTMLElement | null, message: string) => {
  if (errorTip) {
    errorTip.textContent = message;
    errorTip.style.display = 'block';
    errorTip.style.color = '#f56c6c';
    
    // 给输入框添加错误样式
    const input = errorTip.closest('.vg-input')?.querySelector('#project_name') as HTMLInputElement;
    if (input) {
      input.style.borderColor = '#f56c6c';
    }
  }
};

// 清空错误提示
const clearError = (errorTip: HTMLElement | null) => {
  if (errorTip) {
    errorTip.textContent = '';
    errorTip.style.display = 'none';
    
    const input = errorTip.closest('.vg-input')?.querySelector('#project_name') as HTMLInputElement;
    if (input) {
      input.style.borderColor = '';
    }
  }
};

// 显示成功提示
const showSuccessTip = (node: HTMLElement, message: string) => {
  const body = node.querySelector('.vg-dialog-body');
  if (body) {
    const successTip = document.createElement('div');
    successTip.className = 'success-tip';
    successTip.style.cssText = `
      color: #67c23a;
      padding: 10px 0;
      text-align: center;
      font-weight: 500;
    `;
    successTip.textContent = `✅ ${message}`;
    body.appendChild(successTip);
  }
};

// 关闭弹窗
const closePopup = (node: HTMLElement) => {
  // 清空输入
  const input = node.querySelector("#project_name") as HTMLInputElement;
  if (input) {
    input.value = '';
  }
  
  // 清除错误
  const errorTip = node.querySelector(".error-tip") as HTMLElement;
  clearError(errorTip);
  
  // 隐藏弹窗（而不是清空，这样更平滑）
  node.style.display = 'none';
  // 或者完全清空：node.innerHTML = '';
};


