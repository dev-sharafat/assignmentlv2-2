import { Response } from "express";

type TData = {
    success: boolean;
    message: string;
    status: number,
    data?: any
}

export const sendResponse = (res: Response, data: TData) => {
    res
        .status(data.status)
        .json({
            success: data.success,
            message: data.message,
            data: data.data || null
        });
}