import express from "express";
import * as FileController from "../controllers/file.controller";
import * as UploadMiddleware from "../middlewares/upload.middleware";

const router = express.Router();

router.post(
  "/upload-image",
  UploadMiddleware.uploadImage,
  FileController.uploadImage
);
router.post(
  "/upload-video",
  UploadMiddleware.uploadVideo,
  FileController.uploadVideo
);

export default router;
