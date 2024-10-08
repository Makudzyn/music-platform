import { Artist } from "@/lib/defenitions";
import axiosClient from "@/lib/axiosClient";

export const fetchArtists = async(limit: number): Promise<Artist[]> => {
  const response = await axiosClient.get(`/artist/?limit=${limit}`);
  return response.data;
};