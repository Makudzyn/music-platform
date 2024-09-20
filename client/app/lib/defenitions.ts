export type Track = {
  _id: string;
  artist: string;
  title: string;
  lyrics: string;
  listens: number;
  thumbnail: string;
  audio: string;
  duration: number;
  bitrate: string;
  format: string;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export type Comment = {
  _id: string;
  username: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

export type RepeatMode = "none" | "all" | "one";

export type PlayerState = {
  currentTrack: Track | null;
  queue: Track[] | null;
  qIndex: number;
  shuffle: boolean;
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
