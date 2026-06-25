import { init_database } from "../apis/db.ts";

export const init_project = async () => {
  const res = await init_database({
    path: "./project",
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
