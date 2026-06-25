// tests/project_list_test.ts
import {
  assert,
  assertArrayIncludes,
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.208.0/assert/mod.ts";
import {
  afterAll,
  beforeAll,
  describe,
  it,
} from "https://deno.land/std@0.208.0/testing/bdd.ts";
import {
  project_delete,
  project_insert,
  project_list,
} from "../src/apis/project.ts";

describe("project_list 函数测试", () => {
  let createdIds: (string | number)[] = [];

  // 在所有测试之前准备测试数据
  beforeAll(async () => {
    console.log("\n🧹 准备测试数据...");

    // 清理已存在的测试数据
    try {
      const result = await project_list({ name: "Test Project" });
      if (result?.data && Array.isArray(result.data)) {
        for (const p of result.data) {
          if (p.id) {
            await project_delete({ id: p.id });
          }
        }
      }
    } catch (error) {
      console.log("清理错误:", error);
    }

    // 插入测试数据
    const testProjects = [
      {
        name: "Test Project 1",
        description: "Description 1",
        status: "active",
        sort: 1,
      },
      {
        name: "Test Project 2",
        description: "Description 2",
        status: "active",
        sort: 2,
      },
      {
        name: "Test Project 3",
        description: "Description 3",
        status: "inactive",
        sort: 3,
      },
      {
        name: "Test Project 4",
        description: "Description 4",
        status: "active",
        sort: 4,
      },
    ];

    for (const project of testProjects) {
      try {
        const result = await project_insert(project);
        if (result?.data?.id) {
          createdIds.push(result.data.id);
          console.log(`✅ 插入项目: ${project.name} (ID: ${result.data.id})`);
        }
      } catch (error) {
        console.log(`❌ 插入失败 (${project.name}):`, error);
      }
    }
    console.log(`📊 共插入 ${createdIds.length} 个测试项目\n`);
  });

  // 在所有测试之后清理数据
  afterAll(async () => {
    console.log("\n🧹 清理测试数据...");
    for (const id of createdIds) {
      try {
        await project_delete({ id });
        console.log(`🗑️ 删除项目 ID: ${id}`);
      } catch (error) {
        console.log(`❌ 删除失败 (ID: ${id}):`, error);
      }
    }
    console.log("✅ 清理完成\n");
  });

  describe("基础查询功能", () => {
    it("应该能够查询所有项目", async () => {
      const result = await project_list();
      console.log("📊 查询所有项目结果:", result);

      assertExists(result, "返回结果应该存在");
      assertExists(result.data, "返回数据应该存在");
      assert(Array.isArray(result.data), "data 应该是数组");
      assert(result.data.length > 0, "应该至少有一个项目");
    });

    it("应该能够通过 name 字段查询", async () => {
      const result = await project_list({ name: "Test Project 1" });
      console.log("📊 按名称查询结果:", result);

      assertExists(result);
      assertExists(result.data);
      assert(Array.isArray(result.data));
      assert(result.data.length > 0);
      assertEquals(result.data[0].name, "Test Project 1");
    });

    it("应该能够通过 status 字段查询", async () => {
      const result = await project_list({ status: "active" });
      console.log("📊 按状态查询结果:", result);

      assertExists(result);
      assertExists(result.data);
      assert(Array.isArray(result.data));

      if (result.data.length > 0) {
        result.data.forEach((project: any) => {
          assertEquals(project.status, "active");
        });
      }
    });

    it("应该能够通过 sort 数字字段查询", async () => {
      const result = await project_list({ sort: 2 });
      console.log("📊 按数字字段查询结果:", result);

      assertExists(result);
      assertExists(result.data);
      assert(Array.isArray(result.data));

      if (result.data.length > 0) {
        result.data.forEach((project: any) => {
          assertEquals(project.sort, 2);
        });
      }
    });
  });

  describe("组合查询", () => {
    it("应该能够组合多个条件查询", async () => {
      const result = await project_list({
        status: "active",
        sort: 1,
      });
      console.log("📊 组合查询结果:", result);

      assertExists(result);
      assertExists(result.data);
      assert(Array.isArray(result.data));

      if (result.data.length > 0) {
        result.data.forEach((project: any) => {
          assertEquals(project.status, "active");
          assertEquals(project.sort, 1);
        });
      }
    });

    it("应该能够查询不存在的条件", async () => {
      const result = await project_list({ status: "nonexistent" });
      console.log("📊 查询不存在条件结果:", result);

      assertExists(result);
      assertExists(result.data);
      assert(Array.isArray(result.data));
      // 应该返回空数组
      assertEquals(result.data.length, 0);
    });
  });

  describe("边界测试", () => {
    it("应该处理空参数", async () => {
      const result = await project_list({});
      console.log("📊 空参数查询结果:", result);

      assertExists(result);
      assertExists(result.data);
      assert(Array.isArray(result.data));
      assert(result.data.length > 0);
    });

    it("应该处理 null 参数", async () => {
      const result = await project_list(null as any);
      console.log("📊 null 参数查询结果:", result);

      assertExists(result);
      // 应该返回所有项目或空数组
      if (result.data) {
        assert(Array.isArray(result.data));
      }
    });

    it("应该处理 undefined 参数", async () => {
      const result = await project_list(undefined as any);
      console.log("📊 undefined 参数查询结果:", result);

      assertExists(result);
      if (result.data) {
        assert(Array.isArray(result.data));
      }
    });

    it("应该处理包含特殊字符的查询", async () => {
      // 插入包含特殊字符的项目
      const specialProject = {
        name: "Special 'Project'",
        description: "Description with 'quotes'",
      };

      const insertResult = await project_insert(specialProject);
      console.log("📝 插入特殊字符项目:", insertResult);

      if (insertResult?.data?.id) {
        createdIds.push(insertResult.data.id);

        const result = await project_list({ name: "Special 'Project'" });
        console.log("📊 查询特殊字符结果:", result);

        assertExists(result);
        if (
          result.data && Array.isArray(result.data) && result.data.length > 0
        ) {
          assertEquals(result.data[0].name, "Special 'Project'");
        }
      }
    });

    it("应该处理中文查询", async () => {
      // 插入中文项目
      const chineseProject = {
        name: "测试项目",
        description: "中文描述",
      };

      const insertResult = await project_insert(chineseProject);
      console.log("📝 插入中文项目:", insertResult);

      if (insertResult?.data?.id) {
        createdIds.push(insertResult.data.id);

        const result = await project_list({ name: "测试项目" });
        console.log("📊 查询中文结果:", result);

        assertExists(result);
        if (
          result.data && Array.isArray(result.data) && result.data.length > 0
        ) {
          assertEquals(result.data[0].name, "测试项目");
        }
      }
    });
  });

  describe("返回数据结构", () => {
    it("应该包含正确的字段", async () => {
      const result = await project_list({ name: "Test Project 1" });
      console.log("📊 检查数据结构:", result);

      assertExists(result);
      assertExists(result.data);
      assert(Array.isArray(result.data));

      if (result.data.length > 0) {
        const project = result.data[0];
        // 检查基本字段
        assertExists(project.id, "应该包含 id 字段");
        assertExists(project.name, "应该包含 name 字段");

        console.log("📋 项目字段:", Object.keys(project));
      }
    });
  });

  describe("性能测试", () => {
    it("应该在合理时间内完成查询", async () => {
      const startTime = Date.now();
      const result = await project_list();
      const endTime = Date.now();

      const duration = endTime - startTime;
      console.log(`⏱️ 查询耗时: ${duration}ms`);

      assertExists(result);
      assert(duration < 5000, `查询时间 ${duration}ms 超过 5 秒`);
    });

    it("应该能处理大量数据查询", async () => {
      // 插入额外的测试数据
      const extraProjects = [];
      for (let i = 0; i < 10; i++) {
        extraProjects.push({
          name: `Performance Test ${i}`,
          description: `Description ${i}`,
          status: i % 2 === 0 ? "active" : "inactive",
          sort: i,
        });
      }

      const extraIds = [];
      for (const project of extraProjects) {
        try {
          const result = await project_insert(project);
          if (result?.data?.id) {
            extraIds.push(result.data.id);
          }
        } catch (error) {
          console.log("插入错误:", error);
        }
      }
      createdIds.push(...extraIds);

      const startTime = Date.now();
      const result = await project_list();
      const endTime = Date.now();

      console.log(`⏱️ 大数据查询耗时: ${endTime - startTime}ms`);
      console.log(`📊 总记录数: ${result?.data?.length || 0}`);

      assertExists(result);
      assertExists(result.data);
      assert(Array.isArray(result.data));
      assert(result.data.length > 0);
    });
  });
});

// 运行测试
// deno test --allow-net --allow-env --no-check ./tests/project_list_test.ts
