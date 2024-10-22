import axiosClient from "@/lib/axiosClient";

export const fetchMe = async () => {
  try {
    const response = await axiosClient.get(`/user/me`);
    return response.data
  } catch (error) {
    console.error("Fetching user information error:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Error during fetching user information');
  }
}

