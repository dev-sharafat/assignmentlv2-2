import { Request, Response } from "express";
import { sendResponse } from "../../helper/sendResponse";
import { authService } from "./auth.service";

const registerNewUser = async (req: Request, res: Response) => {
    const result = await authService.registerNewUserIntoDB(req);
    sendResponse(res, {
        success: true,
        status: 201,
        message: 'User registered successfully',
        data: result,
    });
}
const loginUser = async (req: Request, res: Response) => {
    const result = await authService.loginUserFromDB(req);
    res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  
        sameSite: 'strict',                              
    });
    sendResponse(res, {
        success: true,
        status: 200,
        message: 'Login successful',
        data: result,
    });
}

export const authController = {
    registerNewUser,
    loginUser
}