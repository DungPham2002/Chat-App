import { axiosInstance } from "../lib/axios";

export class MessageApi {
  getAllUsers = async () => {
    const response = await axiosInstance.get("/api/message/users");
    return response.data.data;
  };
}
