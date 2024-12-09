import { Request, Response } from "express";
import { LoginDto, RegisterDto } from "../dtos/auth.dto";
import * as authService from "../services/auth.service";
import { UpdateProfileDto } from "../dtos/profile.dto";

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const dto: RegisterDto = req.body;
    if (!dto.email || !dto.fullName || !dto.password) {
      return res.status(400).json({ message: "All fields are require" });
    }
    if (dto.password.length < 2) {
      return res
        .status(400)
        .json({ message: "Password must be at least 2 characters" });
    }
    const data = await authService.register({ ...dto });
    res.cookie("jwt", data?.accessToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
    res.status(201).json({
      message: "User registered successfully",
      user: data?.user,
      accessToken: data?.accessToken,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const dto: LoginDto = req.body;
    if (!dto.email || !dto.password) {
      return res.status(400).json({ message: "All fields are require" });
    }
    const data = await authService.login({ ...dto });
    res.cookie("jwt", data?.accessToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
    res.status(201).json({
      message: "User login successfully",
      user: data?.user,
      accessToken: data?.accessToken,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req: Request, res: Response): Promise<any> => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const dto: UpdateProfileDto = req.body;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
