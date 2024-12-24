import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { createApp } from "../server.js";

/**
 * health check endpoint tests
 */
describe("health check", () => {
    let app;

    // create a new app instance before each test
    beforeEach(() => {
        app = createApp();
    });

    it("should return 200 on /health", async () => {
        const response = await request(app).get("/health");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: "ok" });
    });
});
