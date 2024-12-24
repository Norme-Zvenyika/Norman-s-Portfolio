import postgres from 'postgres';
import "./env.config.js";


// supabase postgres connection configuration
export const db = postgres(process.env.DATABASE_URL, {
    idle_timeout: 20
});

// cleanup function for tests/server shutdown
export const closeConnection = async () => {
    await db.end();
};