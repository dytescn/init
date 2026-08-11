// setup-project.ts - 项目初始化脚本
// 1. 插入项目路由（router.db）
// 2. 创建项目数据库（project.db）及表结构

const API_URL = "http://127.0.0.1:44944/database";

// ---------- 通用请求函数 ----------
// 执行任意 SQL（DDL / DML），使用 db_update 符号
async function dbExec(sql: string, path: string) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/libary",
      "FFI-Symbol": "db_update",
    },
    body: JSON.stringify({ path, sql }),
  });
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return res.json();
}

// 插入专用（也可用 dbExec），保留原 dbInsert 语义
async function dbInsert(sql: string, path: string = "router") {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/libary",
      "FFI-Symbol": "db_insert",
    },
    body: JSON.stringify({ path, sql }),
  });
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return res.json();
}

// ---------- 项目路由操作 ----------
async function deleteProjectRouter() {
  await dbInsert(
    `DELETE FROM routers WHERE parent_id IN (SELECT id FROM routers WHERE title = '项目')`
  );
  await dbInsert(`DELETE FROM routers WHERE title = '项目'`);
}

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

  console.log('✅ 项目路由插入成功（固定 ID: 根节点=3, 子节点=4）');
}

// ---------- 创建项目数据库表 ----------
// 改为使用 dbExec 执行建表语句，不再依赖 db_create 符号
async function createProjectTable() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS project (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
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
      deleted_at TEXT
    )
  `;
  // 路径为 ./project（API 会根据路径自动生成 project.db 文件）
  await dbExec(createTableSQL, "./project");
  console.log('项目数据库表创建成功');
}

// ---------- 主流程 ----------
if (import.meta.main) {
  try {
    // 按顺序执行
    await insertProjectRouter();
    await createProjectTable();
    console.log("所有项目初始化任务完成！");
  } catch (error) {
    console.error("初始化失败:", error);
    Deno.exit(1); // 非零退出码表示失败
  }
}