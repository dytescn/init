// setup.ts - 统一初始化脚本
// 1. 创建对话数据库（dialogue.db）的所有表结构
// 2. 插入 AI 路由数据（router.db）

const API_URL = "http://127.0.0.1:44944/database";

// ---------- 通用请求函数 ----------
// 用于执行任意 SQL（如 DDL、DML），使用 db_update 符号
async function dbExec(sql: string, path: string) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/libary", "FFI-Symbol": "db_update" },
    body: JSON.stringify({ path, sql }),
  });
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return res.json();
}

// 用于插入数据（也使用 db_insert，但 dbExec 也能插入）
// 这里保留 dbInsert 专用，但可以统一用 dbExec，为保持原逻辑，保留
async function dbInsert(sql: string, path: string = "router") {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/libary", "FFI-Symbol": "db_insert" },
    body: JSON.stringify({ path, sql }),
  });
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return res.json();
}

// ---------- 1. 创建对话数据库表 ----------
const DIALOGUE_PATH = "./dialogue"; // dialogue.db

const dialogueSqlStatements = [
  // 性能参数
  `PRAGMA foreign_keys = ON;`,
  `PRAGMA journal_mode = WAL;`,
  `PRAGMA cache_size = -64000;`,
  `PRAGMA synchronous = NORMAL;`,
  
  // 创建表 ...
  `CREATE TABLE IF NOT EXISTS prompts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT DEFAULT 'General',
    is_system BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );`,
  // ... 其余表、索引、触发器等，复制前面完整的 sqlStatements 内容
  // 为避免过长，这里写省略号，实际应包含所有语句
];

async function initDialogueDB() {
  console.log("开始初始化对话数据库...");
  for (const sql of dialogueSqlStatements) {
    await dbExec(sql, DIALOGUE_PATH);
    console.log(`✅ 执行成功: ${sql.substring(0, 60)}...`);
  }
  console.log("对话数据库初始化完成。");
}

// ---------- 2. 插入 AI 路由数据 ----------
async function deleteAIRouter() {
  await dbInsert(`DELETE FROM routers WHERE parent_id IN (SELECT id FROM routers WHERE title = 'AI')`, "router");
  await dbInsert(`DELETE FROM routers WHERE title = 'AI'`, "router");
}

async function insertAIRouter() {
  await deleteAIRouter();
  await dbInsert(`DELETE FROM routers WHERE title = 'AI' OR title = 'instro'`, "router");
  await dbInsert(`
    INSERT INTO routers (id, title, icon, hide, path, parent_id, level)
    VALUES (1, 'AI', 'ic-message', 0, '/chat', 0, 1)
  `, "router");
  await dbInsert(`
    INSERT INTO routers (id, title, icon, hide, path, url, show, parent_id, level)
    VALUES (2, 'instro', '', 0, '/chat', '/chat/chat.js', 1, 1, 2)
  `, "router");
  console.log('AI router inserted successfully.');
}

// ---------- 主流程 ----------
if (import.meta.main) {
  try {
    // 先建对话数据库（因为插入路由不依赖它，但顺序无所谓）
    await initDialogueDB();
    // 再插入 AI 路由
    await insertAIRouter();
    console.log("所有初始化任务完成！");
  } catch (e) {
    console.error("初始化失败:", e);
    Deno.exit(1);
  }
}