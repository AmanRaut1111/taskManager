const request = require("supertest");
const app = require("../../app");
const connectDB = require("../../src/config/db");
beforeAll(async () => {
  await connectDB();
});

describe("Register API Test", () => {
  it("should register a user successfully", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Jest User",
        email: `jest${Date.now()}@test.com`,
        password: "password123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("User Registered Successfully...!");
  });
});
