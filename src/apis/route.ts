// route.ts
import { DxHttp } from "@funxdata/webdx/dxhttp";
import { Route } from "@funxdata/pages/routetype";

// ============ 数据库请求封装 ============
async function dbFetch(path: string, symbol: string, body: any) {
  const url = `http://127.0.0.1:44944/${path}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/libary',
      'FFI-Symbol': symbol,
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

// ============ 数据库操作函数 ============
export const dbQuery = async (sql: string, path: string = "router") => {
  const raw = await dbFetch('database', 'db_query', { path, sql });
  // 直接返回数据数组
  if (raw?.data && Array.isArray(raw.data)) {
    return raw.data;
  }
  return raw;
};

export const dbInsert = async (sql: string, path: string = "router") => {
  return dbFetch('database', 'db_insert', { path, sql });
};

export const dbCreate = async (table: string, schema: string, path: string = "router") => {
  return dbFetch('database', 'db_create', { path, table, schema });
};

export const dbExec = async (sql: string, path: string = "router") => {
  return dbFetch('database', 'db_exec', { path, sql });
};

// ============ 核心：获取路由信息（完全兼容原 JSON 格式） ============
export const get_router_info = async (): Promise<Route[]> => {
  const data = await dbQuery(`
    SELECT id, title, path, icon, hide, url, show, parent_id
    FROM routers 
    WHERE hide = 0
    ORDER BY parent_id, id
  `);

  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  const tree: any[] = [];
  const map = new Map();

  // 1. 构建根节点（parent_id === 0 或 null 或空字符串）
  for (const item of data) {
    const isRoot = (item.parent_id === 0 || item.parent_id === null || item.parent_id === '' || item.parent_id === undefined);
    if (isRoot) {
      const node = {
        title: item.title || '',
        icon: item.icon || '',
        hide: item.hide === 1,    // 转为布尔
        path: item.path || '',
        child: [],
      };
      map.set(item.id, node);
      tree.push(node);
    }
  }

  // 2. 构建子节点并挂载到父节点
  for (const item of data) {
    const pid = item.parent_id;
    if (pid && pid !== 0 && pid !== '') {
      const parent = map.get(Number(pid));
      if (parent) {
        const childNode = {
          path: item.path || '',
          url: item.url || '',
          show: item.show === 1,
          title: item.title || '',
        };
        parent.child.push(childNode);
      }
    }
  }

  return tree;
};

// ============ 其他辅助函数 ============
export const get_asides_info = async () => {
  const data = await get_router_info();
  // deno-lint-ignore no-explicit-any
  return data.filter((item:any) => !item.hide);
};

export const getAllRoutersFromDB = async () => {
  return await dbQuery(`
    SELECT 
      p.id, p.title, p.icon, p.hide, p.path, p.child, p.url, p.show, p.parent_id, p.level
    FROM routers p
    WHERE p.parent_id = 0
    ORDER BY p.id
  `);
};

export const getRouterByPathFromDB = async (path: string) => {
  return await dbQuery(`SELECT * FROM routers WHERE path = '${path}'`);
};

export const getChildrenByParentIdFromDB = async (parentId: number) => {
  return await dbQuery(`
    SELECT * FROM routers 
    WHERE parent_id = ${parentId} AND show = 1 
    ORDER BY id
  `);
};