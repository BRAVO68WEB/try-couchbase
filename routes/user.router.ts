import { Hono } from "hono";

import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const userRouter = new Hono();

const userController = new UserController();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

userRouter.use("*", authMiddleware());

userRouter.get("/me", userController.me);
userRouter.get("/i/:id", userController.getUserById);
