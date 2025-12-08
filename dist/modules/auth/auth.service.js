"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../../config/db");
const env_1 = require("../../config/env");
const registerNewUserIntoDB = async (req) => {
    const payload = req?.body;
    // check user exist or not;
    const isUserExist = await db_1.pool.query('SELECT * FROM users WHERE email = $1', [payload.email]);
    if (isUserExist.rows[0]) {
        throw new Error('User already exists');
    }
    // check password length
    if (payload.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
    }
    // hash password
    const hashedPassword = bcryptjs_1.default.hashSync(payload.password, 10);
    payload.password = hashedPassword;
    // insert user into db
    const insertQuery = `
        INSERT INTO users (name, email, password,phone,role)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, name, email, phone, role
    `;
    const values = [payload.name, payload.email, payload.password, payload.phone, payload.role];
    const newUser = await db_1.pool.query(insertQuery, values);
    // return newly created user    
    return newUser.rows[0];
};
const loginUserFromDB = async (req) => {
    const payload = req?.body;
    // check user exist or not;
    const userResult = await db_1.pool.query('SELECT * FROM users WHERE email = $1', [payload.email]);
    const user = userResult.rows[0];
    if (!user) {
        throw new Error('Invalid email or password');
    }
    const isPasswordMatch = bcryptjs_1.default.compareSync(payload.password, user.password);
    if (!isPasswordMatch) {
        throw new Error('Invalid email or password');
    }
    // generate token
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, env_1.config.jwt.accessSecret, { expiresIn: '10d' });
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
};
exports.authService = {
    registerNewUserIntoDB,
    loginUserFromDB
};
//# sourceMappingURL=auth.service.js.map