import { Playlist, Track } from "@/lib/defenitions";
import axiosClient from "@/lib/axiosClient";

export const fetchAlbums = async(limit?: string): Promise<Playlist[]> => {
  const response = await axiosClient.get(`/playlists/albums?limit=${limit}`);
  return response.data;
};

export const fetchAlbumById = async (albumId: string): Promise<Playlist> => {
  const response = await axiosClient.get(`/playlists/${albumId}`);
  return response.data
}

export const fetchAlbumsByArtistId = async(artistId: string): Promise<Playlist[]> => {
  const response = await axiosClient.get(`/playlists/albums/${artistId}`);
  return response.data;
}