import { Hono } from "hono";
import { validator as vValidator } from 'hono-openapi/zod';

import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

import { addUserValidator, loginUserValidator, fetchUserByIdValidator, whoamiValidator } from '../validators/users';
import { registerUserInputSchema, loginUserInputSchema, fetchUserByIdParamsSchema } from "../schemas/user";

export const userRouter = new Hono();

const userController = new UserController();

userRouter.post(
    "/register",
    addUserValidator(),
    vValidator("json", registerUserInputSchema),
    userController.register
);
userRouter.post(
    "/login",
    loginUserValidator(),
    vValidator("json", loginUserInputSchema),
    userController.login
);

userRouter.use("*", authMiddleware());

userRouter.get(
    "/me",
    whoamiValidator(),
    userController.me
);
userRouter.get(
    "/i/:id", 
    fetchUserByIdValidator(),
    vValidator("param", fetchUserByIdParamsSchema),
    userController.getUserById
);
