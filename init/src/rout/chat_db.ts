import { init_database } from "../apis/db.ts";

// 对话组
export const init_chat_group = async () => {
  const res = await init_database({
    path: "chat_group",
    table: "chat_group",
    schema: `
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT NOT NULL,
      chat_uid TEXT NOT NULL,
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
  console.log("workfil table initialized:", res);
  return res;
};

// 对话
export const init_chat_msg = async () => {
  const res = await init_database({
    path: "chat_msg",
    table: "chat",
    schema: `
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT NOT NULL,
      chat_uid TEXT NOT NULL,
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
  console.log("workfil table initialized:", res);
  return res;
};

// 内容
export const init_chat_view = async () => {
  const res = await init_database({
    path: "chat_view",
    table: "chat_view",
    schema: `
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT NOT NULL,
      puid TEXT NOT NULL,
      ouid TEXT NOT NULL,
      flow_uid TEXT,
      type_uid TEXT,
      name TEXT NOT NULL,
      create_by TEXT NOT NULL,
      cover TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      deleted_at DATETIME
    `,
  });
  console.log("chat view table initialized:", res);
  return res;
};

// 插件
export const init_chat_plugin = async () => {
  const res = await init_database({
    path: "chat_plugin",
    table: "chat_plugin",
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
  console.log("chat plugin table initialized:", res);
  return res;
};



