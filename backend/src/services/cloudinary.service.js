"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadVideo = exports.uploadImage = void 0;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const crypto_1 = __importDefault(require("crypto"));
const uploadImage = (filePath, folder) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const publicId = "/" + crypto_1.default.randomUUID();
        const result = yield cloudinary_1.default.uploader.upload(filePath, {
            folder,
            resource_type: "image",
            public_id: publicId,
            overwrite: true,
        });
        return result;
    }
    catch (error) {
        throw new Error("Upload image to Cloudinary failed: " + error.message);
    }
});
exports.uploadImage = uploadImage;
const uploadVideo = (filePath, folder) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const publicId = "/" + crypto_1.default.randomUUID();
        const result = yield cloudinary_1.default.uploader.upload(filePath, {
            folder,
            resource_type: "video",
            public_id: publicId,
            overwrite: true,
        });
        return result;
    }
    catch (error) {
        throw new Error("Upload video to Cloudinary failed: " + error.message);
    }
});
exports.uploadVideo = uploadVideo;
