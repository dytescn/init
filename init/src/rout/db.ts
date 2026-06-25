import {
  init_project,
  init_workfil,
  init_workfil_type,
  init_workfil_version,
} from "./workspace_db.ts";
import { init_ostdir, init_ostfil } from "./ostfil_db.ts";
export const init_db = () => {
  console.log("init_db");
  // 初始化项目数据库
  init_project();

  // 工作文件
 // init_workfil();
 // init_workfil_type();
 // init_workfil_version();

  // 初始化其他数据库
 // init_ostdir();
 // init_ostfil();
};
