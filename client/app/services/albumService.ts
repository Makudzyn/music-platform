import { Playlist, Track } from "@/lib/defenitions";
import axiosClient from "@/lib/axiosClient";

export const fetchAlbums = async(limit?: number): Promise<Playlist[]> => {
  const response = await axiosClient.get(`/playlists/albums?limit=${limit}`);
  return response.data;
};

export const fetchAlbumById = async (albumId: string): Promise<Playlist> => {
  const response = await axiosClient.get(`/playlists/${albumId}`);
  return response.data
}

export const fetchAlbumTracks = async(albumId: string): Promise<Track[]> => {
  const response = await axiosClient.get(`/playlists/tracks/${albumId}`);
  return response.data;
}