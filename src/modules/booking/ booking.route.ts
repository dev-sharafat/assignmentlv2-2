import { Router } from "express";
import auth from "../../middleware/auth";
import { bookingController } from "./booking.controller";

const bookingRoute = Router();

bookingRoute.post('/', auth("customer", "admin"), bookingController.createNewBooking);
bookingRoute.get('/', auth("customer", "admin"), bookingController.getAllBookings);
bookingRoute.put('/:bookingId', auth("customer", "admin"), bookingController.updateBookingStatus);

export default bookingRoute;