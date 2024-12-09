import { Request, Response } from "express";
import fs from "fs";
import * as fileService from "../services/cloudinary.service";

export const uploadImage = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const filePath = req.file.path;
    const folder = "images";

    const result = await fileService.uploadImage(filePath, folder);
    fs.unlinkSync(filePath);

    res.status(200).json({
      message: "Image uploaded successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Image upload failed",
      error: error.message,
    });
  }
};

export const uploadVideo = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const filePath = req.file.path;
    const folder = "videos";

    const result = await fileService.uploadVideo(filePath, folder);
    fs.unlinkSync(filePath);
    res.status(200).json({
      message: "Video uploaded successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Video upload failed",
      error: error.message,
    });
  }
};
