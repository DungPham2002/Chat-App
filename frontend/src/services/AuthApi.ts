import { REACT_APP_API_URL } from "../constants";
import { axiosInstance } from "../lib/axios";

export class AuthApi {
  signup = async (params?: Record<string, any>) => {
    const result = await axiosInstance.post("/api/auth/register", params);
    return result.data;
  };

  logout = async (params?: Record<string, any>) => {
    const result = await axiosInstance.post("/api/auth/logout", params);
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
