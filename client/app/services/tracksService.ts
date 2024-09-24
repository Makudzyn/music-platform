import axios from "axios";
import { Track } from "@/app/lib/defenitions";

export const fetchTracks = async(limit?: string, offset?: string): Promise<Track[]> => {
  const response = await axios.get(
    `http://localhost:5000/tracks/?limit=${limit}&offset=${offset}`
  );
  return response.data;
};

export const fetchTrackById = async(id: string): Promise<Track> => {
  const response = await axios.get(`http://localhost:5000/tracks/${id}`);
  return response.data;
};

export const updateTrackListens = async(id: string): Promise<void> => {
  try {
    await axios.post(`http://localhost:5000/tracks/listen/${id}`);
  } catch (error) {
    console.error("Error updating track listens:", error);
  }
}

export const uploadTrack = async(formData: Object): Promise<void> => {
  try {
    const response = await axios.post('http://localhost:5000/tracks', formData);
    console.log('Track uploaded successfully:', response.data);
  } catch (error) {
    console.error('Error uploading track:', error);
  }
}
