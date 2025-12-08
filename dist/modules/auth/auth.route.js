"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const authRoute = (0, express_1.Router)();
authRoute.post('/signup', auth_controller_1.authController.registerNewUser);
authRoute.post('/signin', auth_controller_1.authController.loginUser);
exports.default = authRoute;
//# sourceMappingURL=auth.route.js.map