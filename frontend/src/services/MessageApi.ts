import { axiosInstance } from "../lib/axios";

export class MessageApi {
  getAllUsers = async () => {
    const response = await axiosInstance.get("/api/message/users");
    return response.data.data;
  };

  getMessages = async (userId: string) => {
    const response = await axiosInstance.get("/api/message/" + userId);
    return response.data.data;
  };

  sendMessage = async (userId: string, param: Record<string, any>) => {
    const response = await axiosInstance.post("/api/message/send/" + userId, param);
    return response.data.data;
  };
}
