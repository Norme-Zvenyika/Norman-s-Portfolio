import { describe, it, expect, beforeEach } from "vitest";
import { createApp } from "../server.js";
import request from "supertest";
import { StatusCodes } from "http-status-codes";

describe("API endpoints", () => {
    let app;

    beforeEach(() => {
        app = createApp();
    });

    describe("POST /messages", () => {
        // test successful message creation
        it("should create a new message", async () => {
            const res = await request(app)
                .post("/messages")
                .send({
                    name: "Test User",
                    email: "test@example.com",
                    message: "Test message"
                });

            expect(res.status).toBe(StatusCodes.CREATED);
            expect(res.body.status).toBe("success");
            expect(res.body.data).toMatchObject({
                name: "Test User",
                email: "test@example.com",
                message: "Test message"
            });
        });

        // test validation failures
        it("should reject invalid email", async () => {
            const res = await request(app)
                .post("/messages")
                .send({
                    name: "Test User",
                    email: "invalid-email",
                    message: "Test message"
                });

            expect(res.status).toBe(StatusCodes.BAD_REQUEST);
        });

        it("should reject empty name", async () => {
            const res = await request(app)
                .post("/messages")
                .send({
                    name: "",
                    email: "test@example.com",
                    message: "Test message"
                });

            expect(res.status).toBe(StatusCodes.BAD_REQUEST);
        });

        it("should reject empty message", async () => {
            const res = await request(app)
                .post("/messages")
                .send({
                    name: "Test User",
                    email: "test@example.com",
                    message: ""
                });

            expect(res.status).toBe(StatusCodes.BAD_REQUEST);
        });
    });

    describe("GET /messages", () => {
        it("should get all messages", async () => {
            const res = await request(app).get("/messages");

            expect(res.status).toBe(StatusCodes.OK);
            expect(res.body.status).toBe("success");
            expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    describe("DELETE /messages/:id", () => {
        it("should return 400 for invalid uuid format", async () => {
            // '99999' is not a valid UUID
            const res = await request(app).delete("/messages/99999");
            expect(res.status).toBe(StatusCodes.BAD_REQUEST);
            expect(res.body.message).toBe("invalid message id format ");
        });

        it("should return 404 for non-existent message with valid uuid format", async () => {
            // this is a valid uuid format, but presumably doesn't exist in db
            const nonExistentUuid = "12345678-1234-1234-1234-123456789abc";
            const res = await request(app).delete(`/messages/${nonExistentUuid}`);
            expect(res.status).toBe(StatusCodes.NOT_FOUND);
            expect(res.body.message).toBe("message not found");
        });
    });
});