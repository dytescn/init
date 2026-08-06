// insertAI.ts - 独立插入脚本，不依赖其他模块

// 数据库 API 地址
const API_URL = "http://127.0.0.1:44944/database";

// 通用请求函数（仅用于插入）
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

// 删除旧的 AI 路由数据（可选，避免重复插入）
async function deleteAIRouter() {
  // 先删除子节点
  await dbInsert(`DELETE FROM routers WHERE parent_id IN (SELECT id FROM routers WHERE title = 'AI')`);
  // 再删除根节点
  await dbInsert(`DELETE FROM routers WHERE title = 'AI'`);
}

// 插入 AI 路由
async function insertAIRouter() {
  // 如果希望覆盖旧数据，先删除
  await deleteAIRouter();

  // 插入根节点（不指定 id，让数据库自动分配）
  const rootSql = `
    INSERT INTO routers (title, icon, hide, path, parent_id, level)
    VALUES ('AI', 'ic-message', 0, '/chat', 0, 1)
  `;
  const rootResult = await dbInsert(rootSql);
  console.log('Root inserted:', rootResult);

  // 获取刚插入的根节点 id（如果 API 返回插入的行 id，否则需要额外查询）
  // 由于我们不使用查询，这里可以预设 id，或使用 LAST_INSERT_ROWID() 的变通方法
  // 方法1：使用固定 id（如果表是空的，可设定 id=1）
  // 方法2：先查询最大 id，再加 1（但这样就使用了查询）
  // 方法3：插入时不指定 id，然后用 SELECT last_insert_rowid() 获取（需要查询，与要求不符）
  // 最稳妥：插入时手动指定唯一 id，如 1（如果确保没有冲突）
  // 假设表为空或可以手动指定 id，我们直接使用 id=1 和 id=2

  // 为了演示，我们重新使用带 id 的插入，以避免查询：
  // 先删除旧的（如果有），然后使用固定的 id
  // 但避免硬编码冲突，我们可以先删除再插入固定 id
  // 使用 INSERT OR REPLACE 也可

  // 这里采用先删除再插入固定 id 的方式
  // 删除已存在（如果之前有）
  await dbInsert(`DELETE FROM routers WHERE title = 'AI' OR title = 'instro'`);
  // 插入根节点
  await dbInsert(`
    INSERT INTO routers (id, title, icon, hide, path, parent_id, level)
    VALUES (1, 'AI', 'ic-message', 0, '/chat', 0, 1)
  `);
  // 插入子节点
  await dbInsert(`
    INSERT INTO routers (id, title, icon, hide, path, url, show, parent_id, level)
    VALUES (2, 'instro', '', 0, '/chat', '/chat/chat.js', 1, 1, 2)
  `);

  console.log('AI router inserted successfully with fixed IDs (1 and 2).');
}

// 执行插入
await insertAIRouter();