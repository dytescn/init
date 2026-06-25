import { DxHttp } from "@funxdata/webdx/dxhttp";

// ============ 数据库配置 ============
const request = new DxHttp({
  baseURL: "http://127.0.0.1:44944",
  timeout: 3000,
  headers: {
    "Content-Type": "application/database",
  },
});

/**
 * 查询项目列表
 */
export const workspace_type_list = async (params: any = {}) => {
  let whereClause = "";
  if (Object.keys(params).length > 0) {
    const conditions = Object.entries(params)
      .map(([key, value]) =>
        `${key} = ${typeof value === "string" ? `'${value}'` : value}`
      )
      .join(" AND ");
    whereClause = ` WHERE ${conditions}`;
  }

  const queryData = {
    path: "workspace_type",
    sql: `SELECT * FROM workspace_type ${whereClause}`,
  };
  const res = await request.post("/database", queryData, {
    headers: {
      "FFI-Symbol": "db_query",
    },
  });
  return res.data;
};

/**
 * 根据 ID 获取项目
 */
export const workspace_type_get = async (id: string | number) => {
  const queryData = {
    path: "workspce_type",
    sql: `SELECT * FROM workspace_type WHERE id = ${
      typeof id === "string" ? `'${id}'` : id
    }`,
  };
  const res = await request.post("/database", queryData, {
    headers: {
      "FFI-Symbol": "db_query",
    },
  });
  return res.data;
};

/**
 * 更新项目
 */
export const workspace_type_update = async (data: any) => {
  const { id, ...updateFields } = data;

  if (!id) {
    throw new Error("ID is required for update");
  }

  const setClause = Object.entries(updateFields)
    .map(([key, value]) =>
      `${key} = ${typeof value === "string" ? `'${value}'` : value}`
    )
    .join(", ");

  const updateData = {
    path: "workspce_type",
    sql: `UPDATE workspace_type SET ${setClause} WHERE id = ${
      typeof id === "string" ? `'${id}'` : id
    }`,
  };
  return request.post("/database", updateData, {
    headers: {
      "FFI-Symbol": "db_update",
    },
  });
};

/**
 * 删除项目
 */
export const workspace_type_delete = async (data: { id: string | number }) => {
  if (!data.id) {
    throw new Error("ID is required for delete");
  }

  const deleteData = {
    path: "workspace_type",
    sql: `DELETE FROM workspace_type  WHERE id = ${
      typeof data.id === "string" ? `'${data.id}'` : data.id
    }`,
  };
  const res = await request.post("/database", deleteData, {
    headers: {
      "FFI-Symbol": "db_delete",
    },
  });
  return res.data;
};

