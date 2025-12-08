import { Request } from "express";
export declare const authService: {
    registerNewUserIntoDB: (req: Request) => Promise<any>;
    loginUserFromDB: (req: Request) => Promise<{
        token: string;
        user: {
            id: any;
            name: any;
            email: any;
            phone: any;
            role: any;
        };
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map