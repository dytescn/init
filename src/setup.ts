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