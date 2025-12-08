"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const sendResponse_1 = require("../../helper/sendResponse");
const user_service_1 = require("./user.service");
const getAllUser = async (req, res) => {
    const result = await user_service_1.userService.getAllUserFromDb();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: 'Users retrieved successfully',
        data: result
    });
};
const updateUserInfo = async (req, res) => {
    const result = await user_service_1.userService.updateUserInfoIntoDb(req);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: 'User updated successfully',
        data: result
    });
};
const deleteUserFromDb = async (req, res) => {
    const result = await user_service_1.userService.deleteUserFromDb(req?.params?.userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: 'User deleted successfully',
        data: result
    });
};
exports.userController = {
    getAllUser,
    updateUserInfo,
    deleteUserFromDb
};
//# sourceMappingURL=user.controller.js.map