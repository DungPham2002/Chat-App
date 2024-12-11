import express from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import * as MessageController from "../controllers/message.controller";

const router = express.Router();

router.get("/users", AuthMiddleware, MessageController.getUserForSidebar);

router.get("/:id", AuthMiddleware, MessageController.sendMessage);

router.post("/send/:id", AuthMiddleware, MessageController.sendMessage);

export default router;
