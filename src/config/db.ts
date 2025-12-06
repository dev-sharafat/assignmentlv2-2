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
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    role VARCHAR(50) DEFAULT 'customer'
        CHECK (role IN ('admin', 'customer'))
);

CREATE TABLE IF NOT EXISTS vehicles (
    id SERIAL PRIMARY KEY,
    vehicle_name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL
        CHECK (type IN ('car', 'bike', 'van', 'SUV')),
    registration_number VARCHAR(50) UNIQUE NOT NULL,
    daily_rent_price DECIMAL(10, 2) NOT NULL,
    availability_status VARCHAR(50) DEFAULT 'available'
        CHECK (availability_status IN ('available', 'booked'))
);

CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES users(id),
    vehicle_id INT REFERENCES vehicles(id),
    rent_start_date DATE NOT NULL,
    rent_end_date DATE NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'active'
        CHECK (status IN ('active', 'cancelled', 'returned'))
);

        `);
        console.log("Database initialized.");
    } finally {
        client.release();
    }
};

export default initDb;