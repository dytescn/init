import type { PagesRouterInfo } from "@funxdata/pages/routetype";
import { aside_init } from "./rout/aside.ts";
import { rout_init } from "./rout/rout.ts";

// deno-lint-ignore no-explicit-any
const GlobalPagesRoute = (globalThis as any)["GlobalPagesRouter"] as PagesRouterInfo;

await rout_init();
await aside_init();

GlobalPagesRoute.replace("/chat");
