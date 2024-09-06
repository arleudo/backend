import { Router } from "express";
import { UserController } from "../controllers";

export const userRouter = Router();
const controller = new UserController();

userRouter.get("/", controller.list);
userRouter.post("/", controller.create);
userRouter.post("/login", controller.login);
userRouter.delete("/:id", controller.delete);
userRouter.put("/", controller.update);

