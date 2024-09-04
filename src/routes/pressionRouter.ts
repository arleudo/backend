import { Router } from "express";
import { PressionController } from "../controllers";

export const pressionRouter = Router();
const controller = new PressionController();

pressionRouter.get("/", controller.list);
pressionRouter.post("/", controller.create);
pressionRouter.delete("/:id", controller.delete);
pressionRouter.put("/", controller.update);

