import { init_database } from "../apis/db.ts";

// 工作文件
export const init_user = async () => {
  const res = await init_database({
    path: "./user",
    table: "user_info",
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
  console.log("workfil table initialized:", res);
  return res;
};

export const init_organ = async () => {
  const res = await init_database({
    path: "./user",
    table: "organ_info",
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
  console.log("workfil table initialized:", res);
  return res;
};




