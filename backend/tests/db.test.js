import { describe, it, expect, beforeEach, afterAll } from "vitest";
import { createApp } from "../server.js";
import { db, closeConnection } from "../config/db.config.js";

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
});