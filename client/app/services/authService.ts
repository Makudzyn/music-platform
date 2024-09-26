import axiosClient from "@/app/lib/axiosClient";
import { AxiosResponse } from "axios";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const authenticate = async(formData: Object): Promise<LoginResponse> => {
  try {
    const response = await axiosClient.post(`http://localhost:5000/auth/login`, formData);
    return response.data
  } catch (error) {
    console.error("Authentication error:", error);
  }
}