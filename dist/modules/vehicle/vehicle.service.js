"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleService = void 0;
const db_1 = require("../../config/db");
const saveNewVehicleIntoDb = async (req) => {
    const payload = req?.body;
    const result = await db_1.pool.query(`INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *`, [
        payload.vehicle_name,
        payload.type,
        payload.registration_number,
        payload.daily_rent_price,
        payload.availability_status
    ]);
    return result.rows[0];
};
const getAllVehiclesFromDb = async () => {
    const result = await db_1.pool.query(`SELECT * FROM vehicles`);
    return result.rows;
};
const getSingleVehicleFromDb = async (vehicleId) => {
    const result = await db_1.pool.query(`SELECT * FROM vehicles WHERE id = $1`, [vehicleId]);
    return result.rows[0];
};
const updateVehicleInDb = async (vehicleId, updateData) => {
    const fields = Object.keys(updateData);
    const values = Object.values(updateData);
    const setString = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    const result = await db_1.pool.query(`UPDATE vehicles SET ${setString} WHERE id = $1 RETURNING *`, [vehicleId, ...values]);
    return result.rows[0];
};
const deleteVehicleFromDb = async (vehicleId) => {
    const result = await db_1.pool.query(`DELETE FROM vehicles 
         WHERE id = $1 
         AND availability_status = 'available'
         RETURNING *`, [vehicleId]);
    return result.rows[0];
};
exports.vehicleService = {
    saveNewVehicleIntoDb,
    getAllVehiclesFromDb,
    getSingleVehicleFromDb,
    updateVehicleInDb,
    deleteVehicleFromDb
};
//# sourceMappingURL=vehicle.service.js.map