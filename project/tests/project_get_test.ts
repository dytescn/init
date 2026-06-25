// tests/project_list_simple_test.ts
import { assertExists } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { project_list } from "../src/apis/project.ts";

Deno.test("简单测试 - 查询所有项目", async () => {
  console.log("🔍 开始测试 project_list...");
  
  const result = await project_list();
  
  console.log("📊 结果类型:", typeof result);
  console.log("📊 结果:", JSON.stringify(result, null, 2));
  
  assertExists(result, "结果应该存在");
  
  // 检查数据结构
  if (result.data) {
    console.log("📊 data 类型:", typeof result.data);
    console.log("📊 data 是数组:", Array.isArray(result.data));
    if (Array.isArray(result.data)) {
      console.log(`📊 data 长度: ${result.data.length}`);
      if (result.data.length > 0) {
        console.log("📊 第一个项目:", result.data[0]);
        console.log("📊 项目字段:", Object.keys(result.data[0]));
      }
    }
  }
  
  console.log("✅ 测试完成");
});

Deno.test("简单测试 - 按条件查询", async () => {
  const result = await project_list({ status: "active" });
  console.log("📊 条件查询结果:", result);
  assertExists(result);
});

// 运行: deno test --allow-net --allow-env --no-check ./tests/project_list_simple_test.ts
