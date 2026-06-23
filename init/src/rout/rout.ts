import type { PagesRouterInfo, Route } from "@funxdata/pages/routetype";
import { get_router_info } from "../apis/route.ts";
const GlobalPagesRoute =
  (globalThis as any)["GlobalPagesRouter"] as PagesRouterInfo;
// 初始化路由
export const rout_init = async () => {
  const req_routerData = await get_router_info();
  const routerinfo = req_routerData.data as Route[];

  console.log(routerinfo);
  for (let index = 0; index < routerinfo.length; index++) {
    const allinfo = routerinfo[index];
    for (let j = 0; j < allinfo.child.length; j++) {
      const element = allinfo.child[j];
      const rout = GlobalPagesRouter.on(element.path, element.title);
      if (element.url != "") {
        if (rout != null) {
          rout.loadjs = element.url;
        }
      }
    }
  }
};
