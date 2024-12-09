import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModal from "../models/user.model";
import { User } from "../types";

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: any
): Promise<any> => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided!" });
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || ""
    ) as JwtPayload;
    if (!decoded || typeof decoded !== "object") {
      return res
        .status(401)
        .json({ message: "Unauthorized - Invalid provided!" });
    }
    const user = await UserModal.findById(
      decoded.id as string
    ).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
