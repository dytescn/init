// src/apis/project.ts
import { DxHttp } from "@funxdata/webdx/dxhttp";
import { NAMESPACE_URL } from "@std/uuid/constants";
import { v7 } from "@std/uuid";

// ============ 数据库配置 ============
const request = new DxHttp({
  baseURL: "http://127.0.0.1:44944",
  timeout: 3000,
  headers: {
    "Content-Type": "application/database",
  },
});

// ============ 默认值 ============
const getDefaultData = (data: any) => {
  return {
    sort: data.sort ?? 0,
    organ_uid: "local",
    create_by: "self",
    private: data.private ?? 0,
    archive: data.archive ?? 2,
    is_recycle: data.is_recycle ?? 2,
    auto_update_schedule: data.auto_update_schedule ?? 0,
  };
};

// ============ 插入项目 ============
export const project_insert = async (data: any) => {
  // 自动生成字段
  data.uuid = v7.generate();
  data.created_at = new Date().toISOString();
  data.updated_at = new Date().toISOString();

  // 合并默认值
  const defaults = getDefaultData(data);
  const fullData = { ...defaults, ...data };

  const insertData = {
    path: "project",
    sql: `INSERT INTO project (${Object.keys(fullData).join(", ")}) VALUES (${
      Object.values(fullData).map((v) => typeof v === "string" ? `'${v}'` : v)
        .join(
          ", ",
        )
    })`,
  };

  return request.post("/database", insertData, {
    headers: {
      "FFI-Symbol": "db_insert",
    },
  });
};
