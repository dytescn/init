// designsoft.ts
// 软件管理 API 封装，支持查询已安装软件、检查运行状态、启动软件

// 基础配置
const BASE_URL = "http://127.0.0.1:44944";
const PATH = "designsoft"; // 统一路径

// ============ 底层请求函数 ============
// deno-lint-ignore no-explicit-any
const designsoftRequest = async (symbol: string, body: any) => {
  const url = `${BASE_URL}/${PATH}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/libary",
      "FFI-Symbol": symbol,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`DesignSoft API error (${response.status}): ${errorText}`);
  }

  return response.json();
};

// ============ 类型定义 ============

/** 软件信息条目 */
export interface SoftwareItem {
  name: string;
  version: string;
}

/** 通用响应格式 */
export interface ApiResponse<T = unknown> {
  code: number; // 0 表示成功，非零表示错误
  msg: string;
  data: T;
}

/** 软件信息查询响应数据 */
export interface InfoResponseData {
  list: SoftwareItem[]; // 可能为空数组
}

/** 状态查询响应数据 */
export interface StatusResponseData {
  status: "未安装" | "已安装但未启动" | "已启动";
}

/** 启动响应数据 */
export interface StartResponseData {
  message: string;
}

// ============ 公开 API 函数 ============

/**
 * 查询匹配关键词的软件列表（主程序，过滤子组件）
 * @param keyword 软件关键词，如 "Illustrator"、"CorelDRAW"
 * @returns 返回软件列表，每个条目包含名称和版本
 * @example
 * const result = await getSoftwareInfo("Illustrator");
 * console.log(result.data.list); // [{ name: "Adobe Illustrator 2025", version: "29.0.0" }]
 */
// deno-lint-ignore require-await
export const getSoftwareInfo = async (keyword: string): Promise<ApiResponse<InfoResponseData>> => {
  return designsoftRequest("info", { keyword });
};

/**
 * 查询指定软件（可指定版本）的运行状态
 * @param keyword 软件关键词
 * @param version 可选，软件版本号（如 "29.0.0"），若不指定且存在多个版本，会返回错误提示
 * @returns 返回状态字符串：未安装 / 已安装但未启动 / 已启动
 * @example
 * const status = await getSoftwareStatus("Illustrator", "29.0.0");
 * console.log(status.data.status); // "已启动"
 */
// deno-lint-ignore require-await
export const getSoftwareStatus = async (
  keyword: string,
  version?: string
): Promise<ApiResponse<StatusResponseData>> => {
  const body: { keyword: string; version?: string } = { keyword };
  if (version !== undefined) {
    body.version = version;
  }
  return designsoftRequest("status", body);
};

/**
 * 启动指定软件（可指定版本）
 * @param keyword 软件关键词
 * @param version 可选，软件版本号，若不指定且存在多个版本，会返回错误提示
 * @returns 启动结果消息（"软件已启动或已在运行"）
 * @example
 * await startSoftware("Illustrator", "29.0.0");
 */
// deno-lint-ignore require-await
export const startSoftware = async (
  keyword: string,
  version?: string
): Promise<ApiResponse<StartResponseData>> => {
  const body: { keyword: string; version?: string } = { keyword };
  if (version !== undefined) {
    body.version = version;
  }
  return designsoftRequest("start", body);
};