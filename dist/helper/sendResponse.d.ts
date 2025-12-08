import { Response } from "express";
type TData = {
    success: boolean;
    message: string;
    status: number;
    data?: any;
};
export declare const sendResponse: (res: Response, data: TData) => void;
export {};
//# sourceMappingURL=sendResponse.d.ts.map