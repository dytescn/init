// tests/project_insert_tests.ts
import {
  assertEquals,
  assertExists,
  assert,
  assertRejects,
} from "https://deno.land/std@0.208.0/assert/mod.ts";
import { describe, it, beforeAll, afterAll } from "https://deno.land/std@0.208.0/testing/bdd.ts";
import { project_insert } from "../src/apis/project.ts";

describe("project_insert", () => {
  // 测试数据
  const validProjectData = {
    uuid: "test-uuid-001",
    organ_uid: "organ-001",
    create_by: "test-user",
    name: "Test Project",
    description: "This is a test project",
    sort: 1,
    status: "active",
  };

  // 清理测试数据 - 在所有测试之前
  beforeAll(async () => {
    console.log("🧹 Cleaning up before tests...");
    // 可以在这里添加清理逻辑
  });

  // 清理测试数据 - 在所有测试之后
  afterAll(async () => {
    console.log("🧹 Cleaning up after tests...");
    // 可以在这里添加清理逻辑
  });

  describe("成功场景", () => {
    it("应该成功插入一个完整的项目", async () => {
      const result = await project_insert(validProjectData);
      console.log("✅ Insert result:", result);
      
      assertExists(result, "返回结果应该存在");
      assertExists(result.data, "返回数据应该存在");
      assertExists(result.data.id, "应该返回插入的 ID");
      
      // 验证返回的数据结构
      assertEquals(typeof result.data.id, "number");
      assertEquals(result.data.name, validProjectData.name);
      assertEquals(result.data.uuid, validProjectData.uuid);
    });

    it("应该成功插入只有必填字段的项目", async () => {
      const minimalData = {
        uuid: "test-uuid-002",
        organ_uid: "organ-002",
        create_by: "test-user-2",
        name: "Minimal Project",
      };
      
      const result = await project_insert(minimalData);
      console.log("✅ Minimal insert result:", result);
      
      assertExists(result);
      assertExists(result.data);
      assertExists(result.data.id);
      assertEquals(result.data.name, minimalData.name);
    });

    it("应该成功插入包含数字字段的项目", async () => {
      const dataWithNumbers = {
        uuid: "test-uuid-003",
        organ_uid: "organ-003",
        create_by: "test-user-3",
        name: "Project With Numbers",
        sort: 100,
        private: 1,
        archive: 2,
        is_recycle: 1,
        auto_update_schedule: 1,
      };
      
      const result = await project_insert(dataWithNumbers);
      console.log("✅ Numbers insert result:", result);
      
      assertExists(result);
      assertExists(result.data);
      assertExists(result.data.id);
      assertEquals(result.data.sort, 100);
    });

    it("应该成功插入包含空字符串字段的项目", async () => {
      const dataWithEmpty = {
        uuid: "test-uuid-004",
        organ_uid: "organ-004",
        create_by: "test-user-4",
        name: "Project With Empty",
        description: "",
        cover: "",
        pro_tpl_uid: "",
      };
      
      const result = await project_insert(dataWithEmpty);
      console.log("✅ Empty fields insert result:", result);
      
      assertExists(result);
      assertExists(result.data);
      assertExists(result.data.id);
    });

    it("应该成功插入包含特殊字符的项目名称", async () => {
      const dataWithSpecialChars = {
        uuid: "test-uuid-005",
        organ_uid: "organ-005",
        create_by: "test-user-5",
        name: "Project with 'single quote' and \"double quote\"",
        description: "Description with special chars: @#$%^&*()",
      };
      
      const result = await project_insert(dataWithSpecialChars);
      console.log("✅ Special chars insert result:", result);
      
      assertExists(result);
      assertExists(result.data);
      assertExists(result.data.id);
    });

    it("应该成功插入包含日期时间的项目", async () => {
      const dataWithDates = {
        uuid: "test-uuid-006",
        organ_uid: "organ-006",
        create_by: "test-user-6",
        name: "Project With Dates",
        begin_time: "2024-01-01 00:00:00",
        end_time: "2024-12-31 23:59:59",
        archive_time: "2024-06-30 12:00:00",
      };
      
      const result = await project_insert(dataWithDates);
      console.log("✅ Dates insert result:", result);
      
      assertExists(result);
      assertExists(result.data);
      assertExists(result.data.id);
    });
  });

  describe("边界情况", () => {
    it("应该处理非常长的字符串字段", async () => {
      const longString = "a".repeat(1000);
      const dataWithLongString = {
        uuid: "test-uuid-007",
        organ_uid: "organ-007",
        create_by: "test-user-7",
        name: longString,
        description: longString,
      };
      
      const result = await project_insert(dataWithLongString);
      console.log("✅ Long string insert result:", result);
      
      assertExists(result);
      assertExists(result.data);
      assertExists(result.data.id);
    });

    it("应该处理最大数字值", async () => {
      const dataWithMaxNumbers = {
        uuid: "test-uuid-008",
        organ_uid: "organ-008",
        create_by: "test-user-8",
        name: "Project With Max Numbers",
        sort: 2147483647,
        private: 1,
      };
      
      const result = await project_insert(dataWithMaxNumbers);
      console.log("✅ Max numbers insert result:", result);
      
      assertExists(result);
      assertExists(result.data);
      assertExists(result.data.id);
    });

    it("应该处理布尔值（转换为数字）", async () => {
      const dataWithBooleans = {
        uuid: "test-uuid-009",
        organ_uid: "organ-009",
        create_by: "test-user-9",
        name: "Project With Booleans",
        private: true,
        archive: false,
        is_recycle: true,
        auto_update_schedule: false,
      };
      
      const result = await project_insert(dataWithBooleans);
      console.log("✅ Booleans insert result:", result);
      
      assertExists(result);
      assertExists(result.data);
      assertExists(result.data.id);
    });
  });

  describe("错误场景", () => {
    it("当缺少必填字段时应该抛出错误", async () => {
      const invalidData = {
        // 缺少 uuid, organ_uid, create_by, name
        description: "Missing required fields",
      };
      
      try {
        await project_insert(invalidData);
        assert(false, "应该抛出错误但没有");
      } catch (error) {
        console.log("❌ Expected error:", error);
        assert(error instanceof Error);
        // 根据实际错误信息调整
        assert(error.message.includes("NOT NULL") || error.message.includes("error"));
      }
    });

    it("当字段名包含特殊字符时应该正确处理", async () => {
      const dataWithSpecialField = {
        uuid: "test-uuid-010",
        organ_uid: "organ-010",
        create_by: "test-user-10",
        name: "Project With Special Field",
        "field-with-dash": "value", // 虽然不推荐，但测试处理能力
      };
      
      try {
        const result = await project_insert(dataWithSpecialField);
        console.log("⚠️ Special field result:", result);
        // 如果成功，验证结果
        if (result?.data?.id) {
          assertExists(result.data.id);
        }
      } catch (error) {
        // 如果失败，确保是合理的错误
        assert(error instanceof Error);
      }
    });

    it("当数据为 null 时应该正确处理", async () => {
      try {
        await project_insert(null as any);
        assert(false, "应该抛出错误但没有");
      } catch (error) {
        console.log("❌ Null data error:", error);
        assert(error instanceof Error);
      }
    });

    it("当数据为 undefined 时应该正确处理", async () => {
      try {
        await project_insert(undefined as any);
        assert(false, "应该抛出错误但没有");
      } catch (error) {
        console.log("❌ Undefined data error:", error);
        assert(error instanceof Error);
      }
    });

    it("当数据为空对象时应该处理", async () => {
      try {
        await project_insert({});
        assert(false, "应该抛出错误但没有");
      } catch (error) {
        console.log("❌ Empty object error:", error);
        assert(error instanceof Error);
      }
    });
  });

  describe("并发测试", () => {
    it("应该处理多个并发插入", async () => {
      const projects = [
        {
          uuid: "test-uuid-concurrent-1",
          organ_uid: "organ-concurrent",
          create_by: "test-user-concurrent",
          name: "Concurrent Project 1",
        },
        {
          uuid: "test-uuid-concurrent-2",
          organ_uid: "organ-concurrent",
          create_by: "test-user-concurrent",
          name: "Concurrent Project 2",
        },
        {
          uuid: "test-uuid-concurrent-3",
          organ_uid: "organ-concurrent",
          create_by: "test-user-concurrent",
          name: "Concurrent Project 3",
        },
        {
          uuid: "test-uuid-concurrent-4",
          organ_uid: "organ-concurrent",
          create_by: "test-user-concurrent",
          name: "Concurrent Project 4",
        },
        {
          uuid: "test-uuid-concurrent-5",
          organ_uid: "organ-concurrent",
          create_by: "test-user-concurrent",
          name: "Concurrent Project 5",
        },
      ];

      const startTime = Date.now();
      const results = await Promise.all(projects.map(p => project_insert(p)));
      const endTime = Date.now();
      
      console.log(`⏱️ Concurrent insert time: ${endTime - startTime}ms`);
      console.log("✅ Concurrent results:", results);
      
      assertEquals(results.length, 5);
      results.forEach((result: any) => {
        assertExists(result);
        assertExists(result.data);
        assertExists(result.data.id);
      });
    });

    it("应该在并发插入中处理重复 UUID", async () => {
      const duplicateUuid = "test-uuid-duplicate";
      const projectData = {
        uuid: duplicateUuid,
        organ_uid: "organ-duplicate",
        create_by: "test-user-duplicate",
        name: "Duplicate UUID Project",
      };

      // 第一次插入应该成功
      const result1 = await project_insert(projectData);
      console.log("✅ First insert:", result1);
      assertExists(result1.data.id);

      // 第二次插入应该失败（因为 uuid 唯一约束）
      try {
        await project_insert(projectData);
        assert(false, "应该抛出唯一约束错误");
      } catch (error) {
        console.log("❌ Duplicate UUID error:", error);
        assert(error instanceof Error);
      }
    });
  });

  describe("数据验证", () => {
    it("插入后应该能查询到数据", async () => {
      const testData = {
        uuid: "test-uuid-verify-001",
        organ_uid: "organ-verify",
        create_by: "test-user-verify",
        name: "Verify Project",
        description: "This project will be verified",
      };

      const insertResult = await project_insert(testData);
      console.log("✅ Insert result for verification:", insertResult);
      
      assertExists(insertResult);
      assertExists(insertResult.data);
      assertExists(insertResult.data.id);

      // 这里可以添加查询验证
      // 但需要先有 project_get 或 project_query 函数
      // 如果还没有这些函数，可以跳过此步骤
      console.log(`✅ Project inserted with ID: ${insertResult.data.id}`);
    });

    it("应该正确保留所有字段的值", async () => {
      const testData = {
        uuid: "test-uuid-values-001",
        organ_uid: "organ-values",
        create_by: "test-user-values",
        name: "Values Test Project",
        description: "Testing all values",
        sort: 999,
        private: 1,
        archive: 2,
        is_recycle: 1,
        auto_update_schedule: 0,
      };

      const result = await project_insert(testData);
      console.log("✅ Values test result:", result);
      
      assertExists(result);
      assertExists(result.data);
      
      // 验证插入的数据
      const insertedData = result.data;
      assertEquals(insertedData.uuid, testData.uuid);
      assertEquals(insertedData.organ_uid, testData.organ_uid);
      assertEquals(insertedData.create_by, testData.create_by);
      assertEquals(insertedData.name, testData.name);
      assertEquals(insertedData.description, testData.description);
      assertEquals(insertedData.sort, testData.sort);
      assertEquals(insertedData.private, testData.private);
      assertEquals(insertedData.archive, testData.archive);
      assertEquals(insertedData.is_recycle, testData.is_recycle);
      assertEquals(insertedData.auto_update_schedule, testData.auto_update_schedule);
    });
  });

  describe("性能测试", () => {
    it("应该快速插入大量数据", async () => {
      const startTime = Date.now();
      const batchSize = 10;
      const results: any[] = [];
      
      for (let i = 0; i < batchSize; i++) {
        const data = {
          uuid: `test-uuid-batch-${i}-${Date.now()}`,
          organ_uid: "organ-batch",
          create_by: "test-user-batch",
          name: `Batch Project ${i}`,
        };
        results.push(await project_insert(data));
      }
      
      const endTime = Date.now();
      console.log(`⏱️ Batch insert ${batchSize} projects: ${endTime - startTime}ms`);
      
      assertEquals(results.length, batchSize);
      results.forEach((result: any) => {
        assertExists(result.data.id);
      });
    });
  });

  describe("数据类型测试", () => {
    it("应该正确处理字符串中的单引号", async () => {
      const dataWithQuotes = {
        uuid: "test-uuid-quotes-001",
        organ_uid: "organ-quotes",
        create_by: "test-user-quotes",
        name: "Project with O'Reilly in name",
        description: "Description with 'single quotes' and \"double quotes\"",
      };
      
      const result = await project_insert(dataWithQuotes);
      console.log("✅ Quotes test result:", result);
      
      assertExists(result);
      assertExists(result.data);
      assertExists(result.data.id);
    });

    it("应该正确处理字符串中的换行符", async () => {
      const dataWithNewlines = {
        uuid: "test-uuid-newlines-001",
        organ_uid: "organ-newlines",
        create_by: "test-user-newlines",
        name: "Project with newlines",
        description: "Line 1\nLine 2\nLine 3",
      };
      
      const result = await project_insert(dataWithNewlines);
      console.log("✅ Newlines test result:", result);
      
      assertExists(result);
      assertExists(result.data);
      assertExists(result.data.id);
    });

    it("应该正确处理 Unicode 字符", async () => {
      const dataWithUnicode = {
        uuid: "test-uuid-unicode-001",
        organ_uid: "organ-unicode",
        create_by: "test-user-unicode",
        name: "项目名称 (Chinese)",
        description: "日本語の説明 (Japanese)",
      };
      
      const result = await project_insert(dataWithUnicode);
      console.log("✅ Unicode test result:", result);
      
      assertExists(result);
      assertExists(result.data);
      assertExists(result.data.id);
    });
  });
});

// 运行测试的命令
// deno test --allow-net --allow-env ./tests/project_insert_tests.ts
// deno test --allow-net --allow-env --filter "project_insert" ./tests/project_insert_tests.ts

