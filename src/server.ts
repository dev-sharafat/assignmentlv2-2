import express, { NextFunction, Request, Response } from 'express';
import initDb from "./config/db";
import { config } from './config/env';
import { sendResponse } from './helper/sendResponse';
import authRoute from './modules/auth/auth.route';
import vehicleRouter from './modules/vehicle/vehicle.route';
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.raw())

// db init
initDb();

// router
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/vehicles', vehicleRouter);

// Sample route to test the server
app.get('/', async (req, res) => {
    sendResponse(
        res,
        {
            success: true,
            status: 200,
            message: 'Server is running successfully',
            data: null,
        }
    )
});


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    sendResponse(res, {
        success: false,
        status: 500,
        message: err?.message || 'Something went wrong',
        data: null
    })
})

// Start the server
app.listen(config.port, () => {
    console.log(`Server is running at http://localhost:${config.port}`);
});

// Export the app for testing purposes
export default app;