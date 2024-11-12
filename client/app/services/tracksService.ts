import axiosClient from '@lib/axiosClient';
import { Track } from '@lib/defenitions';
import { AxiosError } from "axios";

export const fetchTracks = async (limit?: string): Promise<Track[]> => {
  const response = await axiosClient.get(`/tracks/?limit=${limit}`);
  return response.data;
};

export const fetchTrackById = async (id: string): Promise<Track> => {
  try {
    const response = await axiosClient.get(`/tracks/${id}`);
    return response.data;
  } catch (error) {
    let errorMessage;
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message ||
        error.message ||
        'Error during fetching track';
    } else errorMessage = 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
};

export const fetchTracksByArtistId = async (
  artistId: string,
): Promise<Track[]> => {
  const response = await axiosClient.get(`/tracks/by-artist/${artistId}`);
  return response.data;
};

export const fetchTracksByAlbumId = async (
  albumId: string,
): Promise<Track[]> => {
  const response = await axiosClient.get(`/tracks/by-album/${albumId}`);
  return response.data;
};

export const updateTrackListens = async (id: string): Promise<void> => {
  try {
    await axiosClient.post(`/tracks/listen/${id}`);
  } catch (error) {
    let errorMessage;
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message ||
        error.message ||
        'Error updating track listens';
    } else errorMessage = 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
};

export const uploadTrack = async (formData: object): Promise<void> => {
  try {
    await axiosClient.post('/tracks', formData);
  } catch (error) {
    let errorMessage;
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message ||
        error.message ||
        'Error uploading track';
    } else errorMessage = 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
};

export const searchTracks = async (query: string) => {
  try {
    const response = await axiosClient.get(`/tracks/search`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    let errorMessage;
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message ||
        error.message ||
        'Search error';
    } else errorMessage = 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
};

export const postComment = async (formData: object) => {
  try {
    const response = await axiosClient.post(`/comment`, formData);
    return response.data;
  } catch (error) {
    let errorMessage;
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message ||
        error.message ||
        'Error posting comment';
    } else errorMessage = 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
};
