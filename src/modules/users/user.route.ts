import { Router } from "express";
import auth from "../../middleware/auth";
import { userController } from "./user.controller";

const userRouter = Router();

userRouter.get('/', auth("admin"), userController.getAllUser);
userRouter.put('/:userId', auth("customer", "admin"), userController.updateUserInfo);
userRouter.delete('/:userId', auth("admin"), userController.deleteUserFromDb);

export default userRouter;