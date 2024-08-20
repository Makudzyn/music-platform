export type Track = {
  _id: string;
  title: string;
  artist: string;
  lyrics: string;
  listens: number;
  audio: string;
  thumbnail: string;
  comments: Comment[];
}

export type Comment = {
  _id: string;
  username: string;
  text: string;
}

export type RepeatMode = "none" | "all" | "one";

export type PlayerState = {
  currentTrack: null | Track;
  volume: number;
  totalDuration: number;
  currentPosition: number;
  paused: boolean;
  repeatMode: RepeatMode;
}

export type TracksState = {
  tracks: Track[];
  loading: boolean;
  error: string | null;
}
