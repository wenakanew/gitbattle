import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "./app.js";

describe("createApp", () => {
  it("GET / returns service metadata", async () => {
    const app = createApp();
    const res = await request(app).get("/").expect(200);
    expect(res.body).toMatchObject({ name: "gitbattle-server" });
    expect(typeof res.body.version).toBe("string");
  });
});
