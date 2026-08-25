import request from "supertest";
import { beforeAll, afterAll, describe, expect, it } from "vitest";
import { app } from "../src/app.js";
import { prisma } from "../src/utils/prisma.js";

describe("DevOps Practice User API", () => {
  let createdUserId: number;
  const url = app;
  console.log("Testing URL:", url);

  beforeAll(async () => {
    await prisma.$connect();
  });

  // 🛡️ SAFE CLEANUP: Removes only the dummy user created during testing
 

  // Test Case 1: Simple Health Check Route
  describe("GET /api/health", () => {
    it("returns healthy status", async () => {
      const response = await request(app)
        .get("/api/health")
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        status: "ok"
      });
    });
  });
  // Test Case 2: Fetch Users Route (Super Easy)
  describe("GET /api/users", () => {
    it("returns all users successfully", async () => {
      const response = await request(app)
        .get("/api/users")
        .expect(200);

      // Verify that the response contains data
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data || response.body)).toBe(true);
    });
  });

});