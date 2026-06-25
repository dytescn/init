// tests/project_simple_test.ts
import { project_list } from "../src/apis/project.ts";

// 最简单的测试
Deno.test("测试 project_list", async () => {
  console.log("🚀 开始测试...");
  
  const result = await project_list();
  
  console.log("✅ 返回结果:", result);
  console.log("✅ 测试完成!");
});
