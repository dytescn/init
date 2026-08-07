// 数据库 API 地址
const API_URL = "http://127.0.0.1:44944/database";

async function dbInsert(sql: string, path: string = "router") {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/libary",
      "FFI-Symbol": "db_insert",
    },
    body: JSON.stringify({ path, sql }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

async function deleteProjectRouter() {
  await dbInsert(`DELETE FROM routers WHERE parent_id IN (SELECT id FROM routers WHERE title = '项目')`);
  await dbInsert(`DELETE FROM routers WHERE title = '项目'`);
}

// 插入项目路由
async function insertProjectRouter() {
  await deleteProjectRouter();

  await dbInsert(`
    INSERT INTO routers (id, title, icon, hide, path, parent_id, level)
    VALUES (3, '项目', 'ic-project', 0, '/project', 0, 1)
  `);

  await dbInsert(`
    INSERT INTO routers (id, title, icon, hide, path, url, show, parent_id, level)
    VALUES (4, 'project', '', 0, '/project', '/project/project.js', 1, 1, 2)
  `);

  console.log('项目路由插入成功（固定 ID: 根节点=1, 子节点=2)');
}

// 执行插入
await insertProjectRouter();

// 创建项目数据库
const createRes = await fetch("http://127.0.0.1:44944/database", {
  method: "POST",
  headers: {
    "Content-Type": "application/libary",
    "FFI-Symbol": "db_create",
  },
  body: JSON.stringify({
    path: "./project",      // 数据库文件名（不包含扩展名）
    table: "project",       // 表名
    schema: `id INTEGER PRIMARY KEY AUTOINCREMENT,
             uuid TEXT,
             organ_uid TEXT,
             create_by TEXT,
             pro_tpl_uid TEXT,
             cover TEXT,
             name TEXT,
             description TEXT,
             sort INTEGER,
             schedule TEXT,
             private INTEGER,
             archive INTEGER DEFAULT 2,
             archive_time TEXT,
             open_begin_time TEXT,
             open_task_private TEXT,
             begin_time TEXT,
             end_time TEXT,
             recycle_time TEXT,
             is_recycle INTEGER DEFAULT 2,
             auto_update_schedule INTEGER,
             created_at TEXT,
             updated_at TEXT,
             deleted_at TEXT`,
  }),
});

console.log(await createRes.json());
console.log("创建项目成功......");