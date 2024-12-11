import { Request, Response } from "express";
import fs from "fs";
import * as fileService from "../services/file.service";

/**
 * @swagger
 * paths:
 *   /api/file/upload-image:
 *     post:
 *       summary: Upload an image file
 *       description: Uploads an image file and returns the upload result.
 *       tags: [File]
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 image:
 *                   type: string
 *                   format: binary
 *                   description: The image file to be uploaded.
 *       responses:
 *         200:
 *           description: Image uploaded successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Image uploaded successfully"
 *                   data:
 *                     type: object
 *                     description: The result of the image upload.
 *         400:
 *           description: No file uploaded
 *         500:
 *           description: Internal server error during image upload
 */
export const uploadImage = async (
  req: Request,
  res: Response
): Promise<any> => {
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

/**
 * @swagger
 * paths:
 *   /api/file/upload-video:
 *     post:
 *       summary: Upload a video file
 *       description: Uploads a video file and returns the upload result.
 *       tags: [File]
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 video:
 *                   type: string
 *                   format: binary
 *                   description: The video file to be uploaded.
 *       responses:
 *         200:
 *           description: Video uploaded successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Video uploaded successfully"
 *                   data:
 *                     type: object
 *                     description: The result of the video upload.
 *         400:
 *           description: No file uploaded
 *         500:
 *           description: Internal server error during video upload
 */
export const uploadVideo = async (
  req: Request,
  res: Response
): Promise<any> => {
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
