import { User } from "@/lib/defenitions";
import axiosClient from "@/lib/axiosClient";

export async function fetchUserById(userId: string): Promise<User> {
  try {
    const response = await axiosClient.get(`/user/${userId}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}