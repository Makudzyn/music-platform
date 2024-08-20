import axios from "axios";
import { Track } from "@/app/lib/defenitions";

export const fetchTracks = async (): Promise<Track[]> => {
  const response = await axios.get('http://localhost:5000/tracks');
  return response.data;
};

export const fetchTrackById = async (id: string): Promise<Track> => {
  const response = await axios.get(`http://localhost:5000/tracks/${id}`);
  return response.data;
};
