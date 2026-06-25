import { init_database } from "../apis/db.ts";

// 系统相关设置
export const init_setting = async () => {
  const res = await init_database({
    path: "setting",
    table: "setting",
    schema: `
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT NOT NULL,
      puid TEXT NOT NULL,
      ouid TEXT NOT NULL,
      flow_uid TEXT,
      type_uid TEXT,
      name TEXT NOT NULL,
      desc TEXT,
      create_by TEXT NOT NULL,
      cover TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      deleted_at DATETIME
    `,
  });
  console.log("setting table initialized:", res);
  return res;
};

// 路由
export const init_router = async () => {
  const res = await init_database({
    path: "setting",
    table: "router",
    schema: `
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT NOT NULL,
      puid TEXT NOT NULL,
      ouid TEXT NOT NULL,
      flow_uid TEXT,
      type_uid TEXT,
      name TEXT NOT NULL,
      desc TEXT,
      create_by TEXT NOT NULL,
      cover TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      deleted_at DATETIME
    `,
  });
  console.log("setting table initialized:", res);
  return res;
};

// 相关设计软件
export const init_design_soft = async () => {
  const res = await init_database({
    path: "setting",
    table: "design_soft",
    schema: `
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT NOT NULL,
      puid TEXT NOT NULL,
      ouid TEXT NOT NULL,
      flow_uid TEXT,
      type_uid TEXT,
      name TEXT NOT NULL,
      desc TEXT,
      create_by TEXT NOT NULL,
      cover TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      deleted_at DATETIME
    `,
  });
  console.log("setting table initialized:", res);
  return res;
};

