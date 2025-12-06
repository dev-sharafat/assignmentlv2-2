import { Pool } from "pg";
import { config } from "./env";

export const pool = new Pool({
    connectionString: `postgresql://${config.db.userName}:${config.db.password}@ep-noisy-mountain-a4zrgfme-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
});

// int db

const initDb = async () => {
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL
            );
        `);
        console.log("Database initialized.");
    } finally {
        client.release();
    }
};


export default initDb;