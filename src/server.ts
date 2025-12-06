import express from 'express';
import initDb from "./config/db";
import { config } from './config/env';
import { sendResponse } from './helper/sendResponse';
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.raw())

// db init
initDb();

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



// Start the server
app.listen(config.port, () => {
    console.log(`Server is running at http://localhost:${config.port}`);
});

// Export the app for testing purposes
export default app;