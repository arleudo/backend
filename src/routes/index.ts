import { Router } from "express";
import { userRouter } from "./userRouter";
import { pressionRouter } from "./pressionRouter";

export const router = Router();

router.use("/user", userRouter);
router.use("/pression", pressionRouter);