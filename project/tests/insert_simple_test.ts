// tests/insert_simple_test.ts
import { project_insert } from "../src/apis/project.ts";

Deno.test("插入测试数据", async () => {
  console.log("🚀 开始插入测试数据...\n");

  // 只插入必要字段（有 NOT NULL 约束的字段）
  const testData = [
    {
      uuid: "proj-001",
      organ_uid: "org-001",
      create_by: "admin",
      name: "项目A - 前端开发",
      description: "这是一个前端开发项目",
      sort: 1,
    },
    {
      uuid: "proj-002",
      organ_uid: "org-001",
      create_by: "admin",
      name: "项目B - 后端开发",
      description: "这是一个后端开发项目",
      sort: 2,
    },
    {
      uuid: "proj-003",
      organ_uid: "org-002",
      create_by: "zhangsan",
      name: "项目C - 移动端开发",
      description: "这是一个移动端开发项目",
      sort: 3,
    },
    {
      uuid: "proj-004",
      organ_uid: "org-002",
      create_by: "lisi",
      name: "项目D - 数据分析",
      description: "这是一个数据分析项目",
      sort: 4,
    },
    {
      uuid: "proj-005",
      organ_uid: "org-003",
      create_by: "wangwu",
      name: "项目E - DevOps",
      description: "这是一个DevOps项目",
      sort: 5,
    },
  ];

  let successCount = 0;
  let failCount = 0;

  for (const data of testData) {
    try {
      console.log(`📝 插入: ${data.name}`);
      const result = await project_insert(data);
      
      if (result?.data?.code === 200) {
        successCount++;
        console.log(`✅ 成功: ${data.name}`);
        if (result.data.data && result.data.data.id) {
          console.log(`   ID: ${result.data.data.id}`);
        }
      } else {
        failCount++;
        console.log(`❌ 失败: ${data.name}`);
        console.log(`   错误: ${result?.data?.msg || '未知错误'}`);
      }
    } catch (error) {
      failCount++;
      console.log(`❌ 异常: ${data.name}`);
      console.log(`   错误: ${error.message}`);
    }
    console.log("");
  }

  console.log(`\n📊 统计: 成功 ${successCount} 条, 失败 ${failCount} 条`);
});

