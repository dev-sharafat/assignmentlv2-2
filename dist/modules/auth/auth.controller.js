"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const sendResponse_1 = require("../../helper/sendResponse");
const auth_service_1 = require("./auth.service");
const registerNewUser = async (req, res) => {
    const result = await auth_service_1.authService.registerNewUserIntoDB(req);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 201,
        message: 'User registered successfully',
        data: result,
    });
};
const loginUser = async (req, res) => {
    const result = await auth_service_1.authService.loginUserFromDB(req);
    res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: 'Login successful',
        data: result,
    });
};
exports.authController = {
    registerNewUser,
    loginUser
};
//# sourceMappingURL=auth.controller.js.map