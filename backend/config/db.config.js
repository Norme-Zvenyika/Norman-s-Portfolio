import postgres from "postgres";
import "./env.config.js";

// create the postgres instance
const db = postgres(process.env.DATABASE_URL, {
    idle_timeout: 20
});

// cleanup function for tests/server shutdown
const closeConnection = async () => {
    await db.end();
};

/**
 * executes a sql query with placeholders
 * @param {object} queryObject - the query object
 * @param {string} queryObject.sql - the sql query text
 * @param {any[]} queryObject.params - the query parameters
 * @returns {Promise<any[]>} - the query result (rows)
 */
const query = async (queryObject) => {
    try {
        const { sql, params } = queryObject;
        const rows = await db.unsafe(sql, params);
        return rows;
    } catch (err) {
        console.error("problem executing query:", err);
        throw err;
    }
};

export { db, closeConnection, query };
