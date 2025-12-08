import { Request } from "express";
import { pool } from "../../config/db";

const createNewBookingIntoDb = async (req: Request) => {
    const payload = req?.body;
    if (req?.user?.role !== 'admin' && payload?.customer_id !== req?.user?.id) {
        throw new Error('You can create only your booking, Please provide your valid customer_id');
    }

    // checking vehicle exist or not
    const vehicleResult = await pool.query(
        'SELECT * FROM vehicles WHERE id = $1',
        [payload.vehicle_id]
    );
    const vehicle = vehicleResult.rows[0];
    if (!vehicle) {
        throw new Error('Vehicle not found');
    }
    if (vehicle.availability_status !== 'available') {
        throw new Error('Vehicle is not available');
    }

    const start = new Date(payload.rent_start_date);
    const end = new Date(payload.rent_end_date);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (days <= 0) {
        throw new Error("Invalid rental period");
    }
    const total_price = Number(vehicle.daily_rent_price) * days;
    // Insert booking
    const bookingResult = await pool.query(
        `INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
        [payload.customer_id, payload.vehicle_id, payload.rent_start_date, payload.rent_end_date, total_price]
    );

    const booking = bookingResult.rows[0];

    // Mark vehicle as booked
    await pool.query(
        `UPDATE vehicles SET availability_status = 'booked' WHERE id = $1`,
        [payload.vehicle_id]
    );

    return {
        booking,
        vehicle: {
            vehicle_name: vehicle.vehicle_name,
            daily_rent_price: vehicle.daily_rent_price
        }
    };
}

const getAllBookingsFromDb = async (req: Request) => {
    const user = req.user;

    // If admin → see all bookings
    if (user.role === "admin") {
        const result = await pool.query(
            `
            SELECT 
                bookings.*,
                users.name AS customer_name,
                users.email AS customer_email,
                vehicles.vehicle_name,
                vehicles.registration_number
            FROM bookings
            INNER JOIN users 
                ON bookings.customer_id = users.id
            INNER JOIN vehicles
                ON bookings.vehicle_id = vehicles.id
            ORDER BY bookings.id DESC
            `
        );

        return {
            role: "admin",
            bookings: result.rows
        };
    }

    // If customer → only own bookings
    const result = await pool.query(
        `
        SELECT 
            bookings.*,
            vehicles.vehicle_name,
            vehicles.registration_number,
            vehicles.type
        FROM bookings
        INNER JOIN vehicles 
            ON bookings.vehicle_id = vehicles.id
        WHERE bookings.customer_id = $1
        ORDER BY bookings.id DESC
        `,
        [user.id]
    );

    return {
        role: "customer",
        bookings: result.rows
    };
};

const updateBookingStatusInDb = async (req: Request) => {
    const bookingId = req?.params?.bookingId as string;
    const status = req?.body?.status as "cancelled" | "returned";
    const user = req?.user;

    const bookingRes = await pool.query(
        `SELECT * FROM bookings WHERE id = $1`,
        [bookingId]
    );

    if (bookingRes.rows.length === 0) throw new Error("Booking not found");

    const booking = bookingRes.rows[0];

    // Role-based permission checks
    if (user.role === "customer") {
        if (booking.customer_id !== user.id) {
            throw new Error("You are not allowed to modify this booking");
        }
        if (status !== "cancelled") {
            throw new Error("Customers can only cancel bookings");
        }
        if (booking.status !== "active") {
            throw new Error("Only active bookings can be cancelled");
        }
    }

    if (user.role === "admin") {
        if (status === "cancelled") {
            throw new Error("Admins cannot cancel bookings");
        }
        if (status === "returned" && booking.status !== "active") {
            throw new Error("Only active bookings can be marked as returned");
        }
    }

    // Update booking status
    const updatedBookingRes = await pool.query(
        `UPDATE bookings
             SET status = $1
             WHERE id = $2
             RETURNING *`,
        [status, bookingId]
    );

    const updatedBooking = updatedBookingRes.rows[0];

    // If returned → mark vehicle available
    let updatedVehicle = null;

    if (status === "returned") {
        const vehicleRes = await pool.query(
            `UPDATE vehicles
                 SET availability_status = 'available'
                 WHERE id = $1
                 RETURNING availability_status`,
            [booking.vehicle_id]
        );
        updatedVehicle = vehicleRes.rows[0];
    }

    return { updatedBooking, updatedVehicle };
}


export const bookingService = {
    createNewBookingIntoDb,
    getAllBookingsFromDb,
    updateBookingStatusInDb
}