import { axiosInstance } from "../lib/axios";

export class FileApi {
  uploadImage = async (formData: FormData) => {
    const response = await axiosInstance.post(
      "/api/file/upload-image",
      formData,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );
    return response.data;
  };
}
