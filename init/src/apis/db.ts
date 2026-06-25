// src/apis/db.ts
import { DxHttp } from "@funxdata/webdx/dxhttp";

// 创建请求实例 - 去掉 /database
const request = new DxHttp({
  baseURL: "http://127.0.0.1:44944",  // 移除了 /database
  timeout: 3000,
  headers: {
    "Content-Type": "application/database",
  },
});

// 然后在具体请求时加上路径
export const init_database = async (data: any) => {
  console.log("\n📤 Initiating database...");
  console.log("📤 Data:", JSON.stringify(data, null, 2));
  
  try {
    // 在 post 方法中指定 /database 路径
    const response = await request.post("/database", data, {
      headers: {
        "FFI-Symbol": "db_create",
      },
    });
    
    console.log("✅ Response status:", response.status);
    console.log("✅ Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Request failed:", error);
    if (error instanceof Error) {
      console.error("  Error name:", error.name);
      console.error("  Error message:", error.message);
      console.error("  Error stack:", error.stack);
    }
    throw error;
  }
};

