import axiosClient from "@/lib/axiosClient";
import { Track } from "@/lib/defenitions";

export const fetchTracks = async(limit?: string): Promise<Track[]> => {
  const response = await axiosClient.get(`/tracks/?limit=${limit}`);
  return response.data;
};

export const fetchTrackById = async(id: string): Promise<Track> => {
  try {
    const response = await axiosClient.get(`/tracks/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error during fetching track');
  }
};

export const fetchTracksByArtistId = async(artistId: string): Promise<Track[]> => {
  const response = await axiosClient.get(`/tracks/by-artist/${artistId}`);
  return response.data;
}

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
  } catch (error) {
    console.error('Error uploading track:', error);
  }
}

export const searchTracks = async(query: string) => {
  try {
    const response = await axiosClient.get(`/tracks/search`, {
      params: {query}
    });
    return response.data;
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
};

export const postComment = async (formData: Object) => {
  try {
    const response = await axiosClient.post(`/comment`, formData);
    return response.data
  } catch (e) {
    console.error("Error posting comment:", e)
  }
}
