import { Request, Response } from "express";
import { LoginDto, RegisterDto } from "../dtos/auth.dto";
import * as authService from "../services/auth.service";
import { UpdateProfileDto } from "../dtos/profile.dto";

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterDto'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDto'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User login successfully
 *                 user:
 *                   type: object
 *                   description: Details of the logged-in user
 *                 accessToken:
 *                   type: string
 *                   description: JWT token for authentication
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All fields are required
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: User logout
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged out successfully
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred
 */
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

/**
 * @swagger
 * paths:
 *   /api/auth/update-profile:
 *     put:
 *       summary: Update user profile
 *       description: Update the user's profile information (e.g., full name and avatar)
 *       tags: [Auth]
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateProfileDto'
 *       responses:
 *         200:
 *           description: Profile updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: object
 *                     description: The updated user profile data
 *         400:
 *           description: Bad request, invalid data
 *         401:
 *           description: Unauthorized, invalid or missing token
 *         500:
 *           description: Internal server error
 */
export const updateProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const dto: UpdateProfileDto = req.body;
    const data = await authService.updateProfile(req.user.id, { ...dto });
    return res.status(200).json({ data: data });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
