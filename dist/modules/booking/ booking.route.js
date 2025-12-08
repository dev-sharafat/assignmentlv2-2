"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const booking_controller_1 = require("./booking.controller");
const bookingRoute = (0, express_1.Router)();
bookingRoute.post('/', (0, auth_1.default)("customer", "admin"), booking_controller_1.bookingController.createNewBooking);
bookingRoute.get('/', (0, auth_1.default)("customer", "admin"), booking_controller_1.bookingController.getAllBookings);
bookingRoute.put('/:bookingId', (0, auth_1.default)("customer", "admin"), booking_controller_1.bookingController.updateBookingStatus);
exports.default = bookingRoute;
//# sourceMappingURL=%20booking.route.js.map