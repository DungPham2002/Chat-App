import axios from "axios";
import { REACT_APP_API_URL } from "../constants";

export const axiosInstance = axios.create({
  baseURL: REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
