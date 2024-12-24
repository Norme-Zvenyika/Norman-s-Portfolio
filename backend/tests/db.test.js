import { describe, it, expect, beforeEach, afterAll } from "vitest";
import { createApp } from "../server.js";
import { db, closeConnection } from "../config/db.config.js";
import { messageModel } from "../src/models/message.model.js";

/**
 * database tests
 */
describe("database", () => {
    let app;

    // create a new app instance before each test
    beforeEach(() => {
        app = createApp();
    });

    // cleanup after all tests
    afterAll(async () => {
        await closeConnection();
    });

    // test if we can connect to the database
    it("should connect to database successfully", async () => {
        const result = await db`SELECT NOW()`;
        expect(result[0]).toBeDefined();
    });

    // test if the messages table is in the database
    it("should have messages table", async () => {
        const result = await db`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'messages'
            );
        `;
        expect(result[0].exists).toBe(true);
    });

    describe("message operations", () => {
        let testMessageId;

        const testMessage = {
            name: "Test User",
            email: "test@example.com",
            message: "This is a test message"
        };

        // test message creation
        it("should create a new message", async () => {
            const message = await messageModel.createMessage(
                testMessage.name,
                testMessage.email,
                testMessage.message
            );
            testMessageId = message.id;

            expect(message).toMatchObject({
                name: testMessage.name,
                email: testMessage.email,
                message: testMessage.message
            });
            expect(message.id).toBeDefined();
            expect(message.created_at).toBeDefined();
        });

        // test getting all messages
        it("should get all messages", async () => {
            const messages = await messageModel.getAllMessages();
            expect(Array.isArray(messages)).toBe(true);
            expect(messages.length).toBeGreaterThan(0);
        });

        // test message deletion
        it("should delete a message", async () => {
            const deletedMessage = await messageModel.deleteMessage(testMessageId);
            expect(deletedMessage.id).toBe(testMessageId);
            testMessageId = null; // reset since we deleted it
        });
    });
});