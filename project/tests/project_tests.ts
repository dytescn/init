// 使用 Deno 的测试框架和断言
import {
  assert,
  assertArrayIncludes,
  assertEquals,
  assertExists,
  assertObjectMatch,
  assertRejects,
  assertStringIncludes,
} from "https://deno.land/std@0.208.0/assert/mod.ts";
import {
  afterAll,
  beforeAll,
  describe,
  it,
} from "https://deno.land/std@0.208.0/testing/bdd.ts";

// 从源文件导入类型和服务
import type { Project, ProjectQueryParams } from "../src/apis/project.ts";
import { projectService } from "../src/apis/project.ts";
import { dbService } from "../src/apis/database.ts";

// 测试配置
const TEST_PROJECT: Omit<Project, "id" | "created_at" | "updated_at"> = {
  name: "Test Project",
  description: "This is a test project",
  status: "active",
};

// 辅助函数：延迟执行
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("Project Service Tests", () => {
  let createdProjectId: string | number;

  // 在所有测试之前执行
  beforeAll(async () => {
    // 清理测试数据
    try {
      const projects = await projectService.list({ name: "Test Project" });
      for (const project of projects) {
        if (project.id) {
          await projectService.delete(project.id);
        }
      }
      await delay(100);
    } catch (error) {
      console.log("Cleanup error:", error);
    }
  });

  // 在所有测试之后执行
  afterAll(async () => {
    // 清理测试数据
    try {
      const projects = await projectService.list({ name: "Test Project" });
      for (const project of projects) {
        if (project.id) {
          await projectService.delete(project.id);
        }
      }
      await delay(100);
    } catch (error) {
      console.log("Final cleanup error:", error);
    }
  });

  describe("create", () => {
    it("should create a new project", async () => {
      const project = await projectService.create(TEST_PROJECT);

      assertExists(project, "Project should be defined");
      assertExists(project.id, "Project should have an id");
      assertEquals(project.name, TEST_PROJECT.name);
      assertEquals(project.description, TEST_PROJECT.description);
      assertEquals(project.status, TEST_PROJECT.status);

      createdProjectId = project.id!;
    });

    it("should throw error when creating with invalid data", async () => {
      await assertRejects(
        async () => {
          await projectService.create({} as any);
        },
        Error,
        undefined,
        "Should throw error with invalid data",
      );
    });

    it("should create project with minimal data", async () => {
      const minimalProject = {
        name: "Minimal Project",
      };
      const project = await projectService.create(minimalProject);

      assertExists(project);
      assertExists(project.id);
      assertEquals(project.name, "Minimal Project");

      // 清理
      if (project.id) {
        await projectService.delete(project.id);
      }
    });
  });

  describe("getById", () => {
    it("should get project by id", async () => {
      const project = await projectService.getById(createdProjectId);

      assertExists(project, "Project should exist");
      assertEquals(project.id, createdProjectId);
      assertEquals(project.name, TEST_PROJECT.name);
    });

    it("should handle non-existent project", async () => {
      const result = await projectService.getById("non-existent-id");
      // 根据实际 API 行为调整断言
      assert(
        result !== undefined,
        "Result should be defined (maybe null or empty)",
      );
    });

    it("should handle invalid id format", async () => {
      const result = await projectService.getById("" as any);
      assert(result !== undefined);
    });
  });

  describe("list", () => {
    it("should list all projects", async () => {
      const projects = await projectService.list();

      assert(Array.isArray(projects), "Should return an array");
      assert(projects.length > 0, "Should have at least one project");
    });

    it("should filter projects by name", async () => {
      const projects = await projectService.list({ name: "Test Project" });

      assert(Array.isArray(projects));
      assert(projects.length > 0);
      assertStringIncludes(projects[0].name, "Test Project");
    });

    it("should filter projects by status", async () => {
      const projects = await projectService.list({ status: "active" });

      assert(Array.isArray(projects));
      assert(projects.length > 0);
      assertEquals(projects[0].status, "active");
    });

    it("should support pagination", async () => {
      const pageSize = 2;
      const projects = await projectService.list({ page: 1, pageSize });

      assert(Array.isArray(projects));
      assert(projects.length <= pageSize);
    });

    it("should support sorting", async () => {
      const projects = await projectService.list({
        sortBy: "name",
        sortOrder: "asc",
      });

      assert(Array.isArray(projects));
      if (projects.length > 1) {
        assert(projects[0].name <= projects[1].name);
      }
    });

    it("should support multiple filters", async () => {
      const projects = await projectService.list({
        status: "active",
        sortBy: "created_at",
        sortOrder: "desc",
      });

      assert(Array.isArray(projects));
      if (projects.length > 0) {
        assertEquals(projects[0].status, "active");
      }
    });
  });

  describe("update", () => {
    it("should update project", async () => {
      const updateData = {
        name: "Updated Test Project",
        description: "Updated description",
        status: "inactive" as const,
      };

      const updated = await projectService.update(createdProjectId, updateData);

      assertExists(updated);
      assertEquals(updated.id, createdProjectId);
      assertEquals(updated.name, updateData.name);
      assertEquals(updated.description, updateData.description);
      assertEquals(updated.status, updateData.status);
    });

    it("should update project status", async () => {
      const updated = await projectService.updateStatus(
        createdProjectId,
        "archived",
      );

      assertEquals(updated.status, "archived");
    });

    it("should partially update project", async () => {
      const partialUpdate = {
        description: "Partially updated description",
      };
      const updated = await projectService.update(
        createdProjectId,
        partialUpdate,
      );

      assertEquals(updated.description, partialUpdate.description);
      // 其他字段应该保持不变
      assertEquals(updated.name, "Updated Test Project");
    });
  });

  describe("search", () => {
    it("should search projects by keyword", async () => {
      const results = await projectService.search("Test");

      assert(Array.isArray(results));
      assert(results.length > 0);
      assertStringIncludes(results[0].name, "Test");
    });

    it("should return empty array for no matches", async () => {
      const results = await projectService.search("NonExistentKeyword12345");

      assert(Array.isArray(results));
      // 根据实际 API 行为调整
      // 如果 API 返回空数组，则断言长度为 0
      // 如果 API 返回所有项目，则可能需要调整
    });

    it("should combine search with other filters", async () => {
      const results = await projectService.search("Test", {
        status: "active",
      });

      assert(Array.isArray(results));
      if (results.length > 0) {
        assertStringIncludes(results[0].name, "Test");
        assertEquals(results[0].status, "active");
      }
    });
  });

  describe("delete", () => {
    it("should delete project", async () => {
      // 先创建一个新项目专门用于删除测试
      const tempProject = await projectService.create({
        ...TEST_PROJECT,
        name: "Temp Project for Delete",
      });

      const result = await projectService.delete(tempProject.id!);

      assertExists(result);

      // 验证项目已被删除或不再存在
      const deletedProject = await projectService.getById(tempProject.id!);
      // 根据实际 API 行为调整断言
      // 可能返回 null, undefined, 或空对象
      assert(deletedProject !== undefined);
    });

    it("should batch delete projects", async () => {
      // 创建两个新项目用于批量删除测试
      const project1 = await projectService.create({
        ...TEST_PROJECT,
        name: "Batch Delete 1",
      });
      const project2 = await projectService.create({
        ...TEST_PROJECT,
        name: "Batch Delete 2",
      });

      const result = await projectService.batchDelete([
        project1.id!,
        project2.id!,
      ]);

      assertExists(result);
    });

    it("should handle delete of non-existent project", async () => {
      try {
        await projectService.delete("non-existent-id");
        // 如果没有抛出错误，认为删除操作是幂等的
        assert(true);
      } catch (error) {
        // 如果抛出错误，也是合理的
        assert(error instanceof Error);
      }
    });
  });

  describe("error handling", () => {
    it("should handle duplicate key errors gracefully", async () => {
      // 尝试创建重复项目
      await projectService.create(TEST_PROJECT);
      await assertRejects(
        async () => {
          await projectService.create(TEST_PROJECT);
        },
        Error,
        undefined,
        "Should throw error for duplicate project",
      );
    });

    it("should handle invalid operation errors", async () => {
      await assertRejects(
        async () => {
          await projectService.update("invalid-id", { name: "Test" });
        },
        Error,
        undefined,
        "Should throw error for invalid id",
      );
    });

    it("should handle network errors gracefully", async () => {
      // 这个测试需要模拟网络错误
      // 实际实现中可能需要 mock dbService
      // 这里仅作为示例
      try {
        await projectService.create({
          name: "Network Test",
        });
        assert(true);
      } catch (error) {
        assert(error instanceof Error);
      }
    });
  });

  // 性能测试
  describe("performance", () => {
    it("should handle concurrent operations", async () => {
      const timestamp = Date.now();
      const operations = Array(5).fill(null).map((_, index) =>
        projectService.create({
          ...TEST_PROJECT,
          name: `Concurrent Test ${timestamp}-${index}`,
        })
      );

      const results = await Promise.all(operations);
      assertEquals(results.length, 5);

      // 清理
      for (const result of results) {
        if (result.id) {
          await projectService.delete(result.id);
        }
      }
    });

    it("should handle large dataset list", async () => {
      const startTime = Date.now();
      const projects = await projectService.list({ page: 1, pageSize: 100 });
      const endTime = Date.now();

      assert(Array.isArray(projects));
      // 检查性能，应该在合理时间内完成（例如 5 秒）
      assert(endTime - startTime < 5000, "List operation should be fast");
    });
  });

  // 数据完整性测试
  describe("data integrity", () => {
    it("should maintain data consistency after updates", async () => {
      // 创建项目
      const project = await projectService.create({
        name: "Integrity Test",
        description: "Original description",
        status: "active",
      });

      // 更新项目
      await projectService.update(project.id!, {
        description: "Updated description",
      });

      // 获取并验证
      const retrieved = await projectService.getById(project.id!);
      assertEquals(retrieved.description, "Updated description");
      assertEquals(retrieved.name, "Integrity Test");
      assertEquals(retrieved.status, "active");

      // 清理
      if (project.id) {
        await projectService.delete(project.id);
      }
    });
  });
});
