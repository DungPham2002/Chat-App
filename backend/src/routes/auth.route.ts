import express from "express";
import * as AuthController from "../controllers/auth.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const route = express.Router();

route.post("/register", AuthController.register);

route.post("/login", AuthController.login);

route.post("/logout", AuthController.logout);

route.put("/update-profile", AuthMiddleware, AuthController.updateProfile);

export default route;
