"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const vehicle_controller_1 = require("./vehicle.controller");
const vehicleRouter = (0, express_1.Router)();
vehicleRouter.post('/', (0, auth_1.default)("admin"), vehicle_controller_1.vehicleController.saveNewVehicle);
vehicleRouter.get('/', vehicle_controller_1.vehicleController.getAllVehicles);
vehicleRouter.get('/:vehicleId', vehicle_controller_1.vehicleController.getSingleVehicle);
vehicleRouter.put('/:vehicleId', (0, auth_1.default)("admin"), vehicle_controller_1.vehicleController.updateVehicle);
vehicleRouter.delete('/:vehicleId', (0, auth_1.default)("admin"), vehicle_controller_1.vehicleController.deleteVehicle);
exports.default = vehicleRouter;
//# sourceMappingURL=vehicle.route.js.map