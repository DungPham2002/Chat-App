import axios from "axios";
import { axiosInstance } from "../lib/axios";
import { API_URL } from "../constants";

export class AuthApi {
  signup = async (params?: Record<string, any>) => {
    const result = await axiosInstance.post("/api/auth/register", params);
    return result.data;
  };

  logout = async () => {
    const result = await axios.post(API_URL + "/api/auth/logout");
    return result.data;
  };

  login = async (params?: Record<string, any>) => {
    const result = await axiosInstance.post("/api/auth/login", params);
    return result.data;
  };

  updateProfile = async (params?: Record<string, any>) => {
    const result = await axiosInstance.put("/api/auth/update-profile", params);
    return result.data;
  };

  getUserProfile = async (userId: string) => {
    const result = await axiosInstance.get("/api/auth/profile/" + userId);
    return result.data;
  };

  getCurrentUser = async () => {
    const result = await axiosInstance.get("/api/auth/profile");
    return result.data;
  };
}
