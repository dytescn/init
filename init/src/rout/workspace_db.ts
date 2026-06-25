import { init_database } from "../apis/db.ts";

// 初始化项目数据库
export const init_project = async () => {
  const res = await init_database({
    path: "project",
    table: "project",
    schema: `
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT NOT NULL,
      organ_uid TEXT NOT NULL,
      create_by TEXT NOT NULL,
      pro_tpl_uid TEXT,
      cover TEXT,
      name TEXT NOT NULL,
      description TEXT,
      sort INTEGER DEFAULT 0,
      schedule TEXT,
      private INTEGER DEFAULT 0,
      archive INTEGER DEFAULT 2,
      archive_time DATETIME,
      open_begin_time DATETIME,
      open_task_private DATETIME,
      begin_time DATETIME,
      end_time DATETIME,
      recycle_time DATETIME,
      is_recycle INTEGER DEFAULT 2,
      auto_update_schedule INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      deleted_at DATETIME
    `,
  });
  console.log(res);
};


// 工作文件
export const init_workfil = async () => {
  const res = await init_database({
    path: "workspace",
    table: "workfil_file",
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

// 工作文件类型
export const init_workfil_type = async () => {
  const res = await init_database({
    path: "workspace",
    table: "workfil_type",
    schema: `
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT NOT NULL,
      type_name TEXT NOT NULL,
      icon TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      deleted_at DATETIME
    `,
  });
  console.log("workfil type table initialized:", res);
  return res;
};

// 工作文件版本
export const init_workfil_version = async () => {
  const res = await init_database({
    path: "workspace",
    table: "workfil_version",
    schema: `
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT NOT NULL,
      cover TEXT,
      page_uid TEXT NOT NULL,
      child_uid TEXT,
      soft_ver TEXT,
      name TEXT,
      logs TEXT,
      fuid TEXT,
      create_by TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      deleted_at DATETIME
    `,
  });
  console.log("workfil version table initialized:", res);
  return res;
};
