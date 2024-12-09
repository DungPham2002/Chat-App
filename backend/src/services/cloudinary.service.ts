import cloudinary from "../config/cloudinary";
import crypto from "crypto";

export const uploadImage = async (filePath: string, folder: string) => {
  try {
    const publicId = "/" + crypto.randomUUID();

    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "image",
      public_id: publicId,
      overwrite: true,
    });

    return result;
  } catch (error: any) {
    throw new Error("Upload image to Cloudinary failed: " + error.message);
  }
};

export const uploadVideo = async (filePath: string, folder: string) => {
  try {
    const publicId = "/" + crypto.randomUUID();
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "video",
      public_id: publicId,
      overwrite: true,
    });

    return result;
  } catch (error: any) {
    throw new Error("Upload video to Cloudinary failed: " + error.message);
  }
};
