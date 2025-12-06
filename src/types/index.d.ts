export type JwtPayloadType = JwtPayload & {
    email: string;
    role: string;
    iat: number;
    exp: number;
    userId?: Types.ObjectId;
};

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayloadType;
        }
    }
}