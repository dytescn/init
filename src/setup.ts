// 创建包含 child 字段的新表
const createRes = await fetch("http://127.0.0.1:44944/database", {
  method: "POST",
  headers: {
    "Content-Type": "application/libary",
    "FFI-Symbol": "db_create",
  },
  body: JSON.stringify({
    path: "./router",
    table: "routers",
    schema: `id INTEGER PRIMARY KEY, 
             title TEXT, 
             icon TEXT, 
             hide INTEGER, 
             path TEXT, 
             child TEXT, 
             url TEXT, 
             show INTEGER,
             parent_id INTEGER,
             level INTEGER`,
  }),
});

console.log(await createRes.json());

// 创建 designsoft 表（存储软件信息）
const createRes1 = await fetch("http://127.0.0.1:44944/database", {
  method: "POST",
  headers: {
    "Content-Type": "application/libary",
    "FFI-Symbol": "db_create",
  },
  body: JSON.stringify({
    path: "./info",
    table: "designsoft",
    schema: `id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            version TEXT,
            install_path TEXT,
            publisher TEXT,
            install_date TEXT,
            exe_path TEXT,
            status TEXT DEFAULT '未安装' CHECK(status IN ('未安装', '已安装但未启动', '已启动')),
            config TEXT,
            child TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`,
  }),
});

console.log(await createRes1.json());


// 初始化数据

// 临时初始化脚本
const initRes = await fetch("http://127.0.0.1:44944/database", {
  method: "POST",
  headers: { "Content-Type": "application/libary", "FFI-Symbol": "db_create" },
  body: JSON.stringify({
    path: "./info",
    table: "setting",
    schema: `id INTEGER PRIMARY KEY AUTOINCREMENT,
             key TEXT NOT NULL UNIQUE,
             value TEXT,
             category TEXT DEFAULT 'general',
             description TEXT,
             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
             updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`
  })
});
console.log(await initRes.json());