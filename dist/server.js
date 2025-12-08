"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const env_1 = require("./config/env");
const sendResponse_1 = require("./helper/sendResponse");
const auth_route_1 = __importDefault(require("./modules/auth/auth.route"));
const vehicle_route_1 = __importDefault(require("./modules/vehicle/vehicle.route"));
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.raw());
// db init
(0, db_1.default)();
// router
app.use('/api/v1/auth', auth_route_1.default);
app.use('/api/v1/vehicles', vehicle_route_1.default);
// Sample route to test the server
app.get('/', async (req, res) => {
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: 'Server is running successfully',
        data: null,
    });
});
app.use((err, req, res, next) => {
    (0, sendResponse_1.sendResponse)(res, {
        success: false,
        status: 500,
        message: err?.message || 'Something went wrong',
        data: null
    });
});
// Start the server
app.listen(env_1.config.port, () => {
    console.log(`Server is running at http://localhost:${env_1.config.port}`);
});
// Export the app for testing purposes
exports.default = app;
//# sourceMappingURL=server.js.map