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
export const project_list = async (params: any = {}) => {
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
    path: "project",
    sql: `SELECT * FROM project${whereClause}`,
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
export const project_get = async (id: string | number) => {
  const queryData = {
    path: "project",
    sql: `SELECT * FROM project WHERE id = ${
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
export const project_update = async (data: any) => {
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
    path: "project",
    sql: `UPDATE project SET ${setClause} WHERE id = ${
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
export const project_delete = async (data: { id: string | number }) => {
  if (!data.id) {
    throw new Error("ID is required for delete");
  }

  const deleteData = {
    path: "project",
    sql: `DELETE FROM project WHERE id = ${
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

/**
 * 批量删除项目
 */
export const project_batch_delete = async (ids: (string | number)[]) => {
  if (!ids || ids.length === 0) {
    throw new Error("At least one ID is required");
  }

  const idList = ids.map((id) => typeof id === "string" ? `'${id}'` : id).join(
    ", ",
  );
  const deleteData = {
    path: "project",
    sql: `DELETE FROM project WHERE id IN (${idList})`,
  };
  return request.post("/database", deleteData, {
    headers: {
      "FFI-Symbol": "db_delete",
    },
  });
};

/**
 * 更新项目状态
 */
export const project_update_status = async (
  id: string | number,
  status: string,
) => {
  if (!id) {
    throw new Error("ID is required");
  }
  if (!status) {
    throw new Error("Status is required");
  }

  const updateData = {
    path: "project",
    sql: `UPDATE project SET status = '${status}' WHERE id = ${
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
 * 搜索项目（按名称模糊查询）
 */
export const project_search = async (keyword: string, params: any = {}) => {
  if (!keyword || keyword.trim() === "") {
    throw new Error("Search keyword is required");
  }

  let whereClause = `name LIKE '%${keyword}%'`;

  // 添加额外条件
  if (Object.keys(params).length > 0) {
    const conditions = Object.entries(params)
      .map(([key, value]) =>
        `${key} = ${typeof value === "string" ? `'${value}'` : value}`
      )
      .join(" AND ");
    whereClause += ` AND ${conditions}`;
  }

  const queryData = {
    path: "project",
    sql: `SELECT * FROM project WHERE ${whereClause}`,
  };
  return request.post("/database", queryData, {
    headers: {
      "FFI-Symbol": "db_query",
    },
  });
};

/**
 * 软删除项目（更新 deleted_at）
 */
export const project_soft_delete = async (id: string | number) => {
  if (!id) {
    throw new Error("ID is required");
  }

  const updateData = {
    path: "project",
    sql: `UPDATE project SET deleted_at = CURRENT_TIMESTAMP WHERE id = ${
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
 * 恢复已删除的项目
 */
export const project_restore = async (id: string | number) => {
  if (!id) {
    throw new Error("ID is required");
  }

  const updateData = {
    path: "project",
    sql: `UPDATE project SET deleted_at = NULL WHERE id = ${
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
 * 统计项目数量
 */
export const project_count = async (params: any = {}) => {
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
    path: "project",
    sql: `SELECT COUNT(*) as count FROM project${whereClause}`,
  };
  return request.post("/database", queryData, {
    headers: {
      "FFI-Symbol": "db_query",
    },
  });
};
