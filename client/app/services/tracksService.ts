import axiosClient from "@/lib/axiosClient";
import { Track } from "@/lib/defenitions";

export const fetchTracks = async(limit?: string, offset?: string): Promise<Track[]> => {
  const response = await axiosClient.get(`/tracks/?limit=${limit}&offset=${offset}`);
  return response.data;
};

export const fetchTrackById = async(id: string): Promise<Track> => {
  const response = await axiosClient.get(`/tracks/${id}`);
  return response.data;
};

export const updateTrackListens = async(id: string): Promise<void> => {
  try {
    await axiosClient.post(`/tracks/listen/${id}`);
  } catch (error) {
    console.error("Error updating track listens:", error);
  }
}

export const uploadTrack = async(formData: Object): Promise<void> => {
  try {
    const response = await axiosClient.post('/tracks', formData);
    console.log('Track uploaded successfully:', response.data);
  } catch (error) {
    console.error('Error uploading track:', error);
  }
}

export const searchTracks = async (query: string) => {
  try {
    const response = await axiosClient.get(`/tracks/search`, {
      params: { query }
    });
    return response.data;
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
};
