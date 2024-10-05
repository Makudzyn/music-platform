import { Album } from "@/lib/defenitions";
import axiosClient from "@/lib/axiosClient";

export const fetchAlbums = async(limit: number): Promise<Album[]> => {
  const response = await axiosClient.get(`/playlists/albums?limit=${limit}`);
  return response.data;
};