import { Request } from "express";
import { pool } from "../../config/db";

const getAllUserFromDb = async () => {
    const result = await pool.query(`
        SELECT id, name, email, phone, role
        FROM users
        `);
    return result.rows;
}

const updateUserInfoIntoDb = async (req: Request) => {
    const user = req?.user;
    const payload = req?.body;
    let result;
    if (user?.role == "customer") {
        result = await pool.query(`
        UPDATE users
        SET name = $1, email = $2, phone = $3
        WHERE id = $4
        RETURNING id, name, email, phone, role
        `, [payload.name, payload.email, payload.phone, user.id]);
    }
    else if (user?.role == "admin") {
        result = await pool.query(`
        UPDATE users
        SET name = $1, email = $2, phone = $3 , role = $4
        WHERE email = $3
        RETURNING id, name, email, phone, role
        `, [payload.name, payload.email, payload.phone, payload.role, payload.email]);
    }
    return result?.rows[0];
}

const deleteUserFromDb = async (userId: string) => {
    // check booking exist or not;
    const isBookingExist = await pool.query(
        'SELECT * FROM bookings WHERE customer_id = $1',
        [userId]
    );
    if (isBookingExist.rows[0]) {
        throw new Error('User has active booking');
    }

    const result = await pool.query(
        `DELETE FROM users 
         WHERE id = $1 AND role = 'customer'
         RETURNING *`,
        [userId]
    );
    return result.rows[0];
}



export const userService = {
    getAllUserFromDb,
    updateUserInfoIntoDb,
    deleteUserFromDb,

}