import { init_database } from "../apis/db.ts";

// 文件夹列表
export const init_ostdir = async () => {
  const res = await init_database({
    path: "ostdir",
    table: "ostdir",
    schema: `
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT NOT NULL,
      ouid TEXT NOT NULL,
      fuid TEXT,
      suid TEXT,
      title TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      deleted_at DATETIME
    `,
  });
  console.log(res);
};


// 文件列表
export const init_ostfil = async () => {
  const res = await init_database({
    path: "ostfil",
    table: "ostfil",
    schema: `
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT NOT NULL,
      ouid TEXT NOT NULL,
      storage_vendor TEXT,
      fuid TEXT,
      path_name TEXT,
      title TEXT NOT NULL,
      extension TEXT,
      size ITEGER DEFAULT 0,
      create_by TEXT NOT NULL,
      downloads INTEGER DEFAULT 0,
      extra TEXT,
      file_group TEXT,
      file_type TEXT,
      store_buket TEXT,
      store_url TEXT,
      file_hash TEXT,
      slice_sum INTEGER DEFAULT 0,
      cover TEXT,
      is_large INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      deleted_at DATETIME
    `,
  });
  console.log(res);
};


// 文件切片列表
export const init_ostfil_slice = async () => {
  const res = await init_database({
    path: "ostfil_slice",
    table: "ostfil_slice",
    schema: `
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT NOT NULL,
      ouid TEXT NOT NULL,
      storage_vendor TEXT,
      fuid TEXT,
      path_name TEXT,
      title TEXT NOT NULL,
      extension TEXT,
      size ITEGER DEFAULT 0,
      create_by TEXT NOT NULL,
      downloads INTEGER DEFAULT 0,
      extra TEXT,
      file_group TEXT,
      file_type TEXT,
      store_buket TEXT,
      store_url TEXT,
      file_hash TEXT,
      slice_sum INTEGER DEFAULT 0,
      cover TEXT,
      is_large INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      deleted_at DATETIME
    `,
  });
  console.log(res);
};



