"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const sendResponse_1 = require("../../helper/sendResponse");
const booking_service_1 = require("./booking.service");
const createNewBooking = async (req, res) => {
    const result = await booking_service_1.bookingService.createNewBookingIntoDb(req);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: 'Booking created successfully',
        data: result
    });
};
const getAllBookings = async (req, res) => {
    const { role, bookings } = await booking_service_1.bookingService.getAllBookingsFromDb(req);
    if (role == "admin") {
        return (0, sendResponse_1.sendResponse)(res, {
            success: true,
            status: 200,
            message: 'Your bookings retrieved successfully',
            data: bookings.map(b => ({
                id: b.id,
                customer_id: b.customer_id,
                vehicle_id: b.vehicle_id,
                rent_start_date: b.rent_start_date,
                rent_end_date: b.rent_end_date,
                total_price: b.total_price,
                status: b.status,
                customer: {
                    name: b.customer_name,
                    email: b.customer_email
                },
                vehicle: {
                    vehicle_name: b.vehicle_name,
                    registration_number: b.registration_number
                }
            }))
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            status: 200,
            message: 'Bookings retrieved successfully',
            data: bookings.map(b => ({
                id: b.id,
                vehicle_id: b.vehicle_id,
                rent_start_date: b.rent_start_date,
                rent_end_date: b.rent_end_date,
                total_price: b.total_price,
                status: b.status,
                vehicle: {
                    vehicle_name: b.vehicle_name,
                    registration_number: b.registration_number,
                    type: b.type
                }
            }))
        });
    }
};
const updateBookingStatus = async (req, res) => {
    const { status } = req.body;
    if (!["cancelled", "returned"].includes(status)) {
        throw new Error("Invalid status - cancelled or returned only allow");
    }
    const { updatedBooking, updatedVehicle } = await booking_service_1.bookingService.updateBookingStatusInDb(req);
    if (status === "cancelled") {
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            status: 200,
            message: 'Booking cancelled successfully',
            data: updatedBooking
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            status: 200,
            message: 'Booking returned successfully',
            data: {
                ...updatedBooking,
                vehicle: updatedVehicle
            }
        });
    }
};
exports.bookingController = {
    createNewBooking,
    getAllBookings,
    updateBookingStatus
};
//# sourceMappingURL=booking.controller.js.map