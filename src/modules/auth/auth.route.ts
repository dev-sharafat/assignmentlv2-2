import { Router } from "express";
import { authController } from "./auth.controller";

const authRoute = Router();

authRoute.post('/signup', authController.registerNewUser);
authRoute.post('/signin', authController.loginUser);

export default authRoute;