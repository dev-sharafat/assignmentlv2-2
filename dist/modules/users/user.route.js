"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_controller_1 = require("./user.controller");
const userRouter = (0, express_1.Router)();
userRouter.get('/', (0, auth_1.default)("admin"), user_controller_1.userController.getAllUser);
userRouter.put('/:userId', (0, auth_1.default)("customer", "admin"), user_controller_1.userController.updateUserInfo);
userRouter.delete('/:userId', (0, auth_1.default)("admin"), user_controller_1.userController.deleteUserFromDb);
exports.default = userRouter;
//# sourceMappingURL=user.route.js.map