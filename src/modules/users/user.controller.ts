import { Request, Response } from "express";
import { sendResponse } from "../../helper/sendResponse";
import { userService } from "./user.service";

const getAllUser = async (req: Request, res: Response) => {
    const result = await userService.getAllUserFromDb();
    sendResponse(res, {
        success: true,
        status: 200,
        message: 'Users retrieved successfully',
        data: result
    });
}
const updateUserInfo = async (req: Request, res: Response) => {
    const result = await userService.updateUserInfoIntoDb(req);
    sendResponse(res, {
        success: true,
        status: 200,
        message: 'User updated successfully',
        data: result
    });
}
const deleteUserFromDb = async (req: Request, res: Response) => {
    const result = await userService.deleteUserFromDb(req?.params?.userId as string);
    sendResponse(res, {
        success: true,
        status: 200,
        message: 'User deleted successfully',
        data: result
    });
}

export const userController = {
    getAllUser,
    updateUserInfo,
    deleteUserFromDb
}