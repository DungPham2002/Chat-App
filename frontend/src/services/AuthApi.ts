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

}
