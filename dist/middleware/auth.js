"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../config/db");
const env_1 = require("../config/env");
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                throw new Error('You are not authorize!!');
            }
            const verifiedUser = jsonwebtoken_1.default.verify(token, env_1.config.jwt.accessSecret);
            // role validation
            if (!roles.includes(verifiedUser?.role)) {
                throw new Error('You are not authorize!!');
            }
            const isUserExist = await db_1.pool.query(`SELECT * FROM users WHERE id = $1`, [verifiedUser.id]);
            const user = isUserExist.rows[0];
            req.user = { ...verifiedUser, id: user.id, };
            next();
        }
        catch (err) {
            next(err);
        }
    };
};
exports.default = auth;
//# sourceMappingURL=auth.js.map