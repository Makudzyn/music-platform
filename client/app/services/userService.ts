import { User } from '@lib/defenitions';
import axiosClient from '@lib/axiosClient';

export async function fetchUserById(userId: string): Promise<User> {
  try {
    const response = await axiosClient.get(`/user/${userId}`);
    return response.data;
  } catch (e) {
    throw new Error(`Error fetching user data: ${e}`);
  }
}

export async function patchUserData(
  formData: FormData,
  userId: string,
): Promise<void> {
  try {
    await axiosClient.patch(`/user/${userId}`, formData);
  } catch (e) {
    throw new Error(`Error updating user data: ${e}`);
  }
}
