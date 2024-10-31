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

export async function patchUserData(formData: Object, userId: string): Promise<void> {
  try {
    await axiosClient.patch(`/user/${userId}`, formData);
  } catch (e) {
    console.log(e);
  }
}