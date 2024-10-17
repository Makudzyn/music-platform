import { Artist, Track } from "@/lib/defenitions";
import axiosClient from "@/lib/axiosClient";

export const fetchArtists = async(limit: number): Promise<Artist[]> => {
  const response = await axiosClient.get(`/artists/?limit=${limit}`);
  return response.data;
};

export const fetchArtistById = async(artistId: string): Promise<Artist> => {
  const response = await axiosClient.get(`/artists/${artistId}`);
  return response.data
}

