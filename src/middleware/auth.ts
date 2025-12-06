import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db';
import { config } from '../config/env';

type Role = "admin" | "customer"


const auth = (...roles: Role[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                throw new Error('You are not authorize!!',);
            }

            const verifiedUser: any = jwt.verify(
                token,
                config.jwt.accessSecret as string,
            );
            // role validation
            if (!roles.includes(verifiedUser?.role)) {
                throw new Error('You are not authorize!!',);
            }
            const isUserExist = await pool.query(
                `SELECT * FROM users WHERE id = $1`,
                [verifiedUser.id]
            );
            const user = isUserExist.rows[0];
            req.user = { ...verifiedUser, id: user.id, } as any;
            next();
        } catch (err) {
            next(err);
        }
    };
};

export default auth;