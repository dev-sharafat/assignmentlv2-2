import bcrypt from "bcryptjs";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { pool } from "../../config/db";
import { config } from "../../config/env";

const registerNewUserIntoDB = async (req: Request) => {
    const payload = req?.body;
    // check user exist or not;
    const isUserExist = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [payload.email]
    );
    if (isUserExist.rows[0]) {
        throw new Error('User already exists');
    }

    // check password length
    if (payload.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
    }

    // hash password
    const hashedPassword = bcrypt.hashSync(payload.password, 10);
    payload.password = hashedPassword;

    // insert user into db
    const insertQuery = `
        INSERT INTO users (name, email, password,phone,role)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, name, email, phone, role
    `;
    const values = [payload.name, payload.email, payload.password, payload.phone, payload.role];
    const newUser = await pool.query(insertQuery, values);

    // return newly created user    
    return newUser.rows[0];
}

const loginUserFromDB = async (req: Request) => {
    const payload = req?.body;
    // check user exist or not;
    const userResult = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [payload.email]
    );
    const user = userResult.rows[0];
    if (!user) {
        throw new Error('Invalid email or password');
    }
    const isPasswordMatch = bcrypt.compareSync(payload.password, user.password);
    if (!isPasswordMatch) {
        throw new Error('Invalid email or password');
    }
    // generate token
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        config.jwt.accessSecret as string,
        { expiresIn: '10d' }
    )
    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role
        }
    };
}

export const authService = {
    registerNewUserIntoDB,
    loginUserFromDB
}