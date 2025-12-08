"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleController = void 0;
const sendResponse_1 = require("../../helper/sendResponse");
const vehicle_service_1 = require("./vehicle.service");
const saveNewVehicle = async (req, res) => {
    const result = await vehicle_service_1.vehicleService.saveNewVehicleIntoDb(req);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 201,
        message: 'Vehicle saved successfully',
        data: result
    });
};
const getAllVehicles = async (req, res) => {
    const result = await vehicle_service_1.vehicleService.getAllVehiclesFromDb();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: 'Vehicles retrieved successfully',
        data: result
    });
};
const getSingleVehicle = async (req, res) => {
    const result = await vehicle_service_1.vehicleService.getSingleVehicleFromDb(req?.params?.vehicleId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: 'Vehicles retrieved successfully',
        data: result
    });
};
const updateVehicle = async (req, res) => {
    const result = await vehicle_service_1.vehicleService.updateVehicleInDb(req?.params?.vehicleId, req?.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: 'Vehicle updated successfully',
        data: result
    });
};
const deleteVehicle = async (req, res) => {
    const result = await vehicle_service_1.vehicleService.deleteVehicleFromDb(req?.params?.vehicleId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: 'Vehicle deleted successfully',
        data: result
    });
};
exports.vehicleController = {
    saveNewVehicle,
    getAllVehicles,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle
};
//# sourceMappingURL=vehicle.controller.js.map