import { Request } from "express";
export declare const bookingService: {
    createNewBookingIntoDb: (req: Request) => Promise<{
        booking: any;
        vehicle: {
            vehicle_name: any;
            daily_rent_price: any;
        };
    }>;
    getAllBookingsFromDb: (req: Request) => Promise<{
        role: string;
        bookings: any[];
    }>;
    updateBookingStatusInDb: (req: Request) => Promise<{
        updatedBooking: any;
        updatedVehicle: any;
    }>;
};
//# sourceMappingURL=booking.service.d.ts.map