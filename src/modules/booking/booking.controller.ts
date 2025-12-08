import { Request, Response } from "express";
import { sendResponse } from "../../helper/sendResponse";
import { bookingService } from "./booking.service";

const createNewBooking = async (req: Request, res: Response) => {
    const result = await bookingService.createNewBookingIntoDb(req);
    sendResponse(res, {
        success: true,
        status: 200,
        message: 'Booking created successfully',
        data: result
    });
}
const getAllBookings = async (req: Request, res: Response) => {
    const { role, bookings } = await bookingService.getAllBookingsFromDb(req);
    if (role == "admin") {
        return sendResponse(res, {
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
        sendResponse(res, {
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
}

const updateBookingStatus = async (req: Request, res: Response) => {
    const { status } = req.body;
    if (!["cancelled", "returned"].includes(status)) {
        throw new Error("Invalid status - cancelled or returned only allow");
    }
    const { updatedBooking, updatedVehicle } = await bookingService.updateBookingStatusInDb(req);
    if (status === "cancelled") {
        sendResponse(res, {
            success: true,
            status: 200,
            message: 'Booking cancelled successfully',
            data: updatedBooking
        });
    }
    else {
        sendResponse(res, {
            success: true,
            status: 200,
            message: 'Booking returned successfully',
            data: {
                ...updatedBooking,
                vehicle: updatedVehicle
            }
        });
    }

}

export const bookingController = {
    createNewBooking,
    getAllBookings,
    updateBookingStatus
}