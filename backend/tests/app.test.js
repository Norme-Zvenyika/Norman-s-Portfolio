// imports needed for testing our express application
import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { createApp } from "../server.js";

/**
 * app test suite - verifies core express application functionality
 */
describe("app", () => {
	let app;

	beforeEach(() => {
		app = createApp();
	});

	/**
	 * health check endpoint tests
	 */
	describe("health check", () => {
		it("should return 200 for health check endpoint", async () => {
			const response = await request(app).get("/health");
			expect(response.status).toBe(200);
			expect(response.body).toEqual({ status: "ok" });
		});
	});
});
