import { Artist } from '@/lib/defenitions';
import axiosClient from '@/lib/axiosClient';

export const fetchArtists = async (limit: string): Promise<Artist[]> => {
  const response = await axiosClient.get(`/artists/?limit=${limit}`);
  return response.data;
};

export const fetchArtistById = async (artistId: string): Promise<Artist> => {
  const response = await axiosClient.get(`/artists/${artistId}`);
  return response.data;
};
