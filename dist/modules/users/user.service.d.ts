import { Request } from "express";
export declare const userService: {
    getAllUserFromDb: () => Promise<any[]>;
    updateUserInfoIntoDb: (req: Request) => Promise<any>;
    deleteUserFromDb: (userId: string) => Promise<any>;
};
//# sourceMappingURL=user.service.d.ts.map