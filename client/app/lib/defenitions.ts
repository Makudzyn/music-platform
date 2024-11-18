export interface Track {
  _id: string;
  artist: Artist;
  album: Playlist;
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

export interface Artist {
  _id: string;
  name: string;
  artistImage: string;
  totalListens: number;
  aboutInfo: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Playlist {
  _id: string;
  title: string;
  description: string;
  coverImage: string;
  releaseDate: string;
  tracksAmount: number;
  totalDuration: number;
  artist: Artist;
  tracks: Track[];
  type: PlaylistType;
  owner: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  _id: string;
  username: string;
  avatar: string;
  bio: string;
  email: string;
  role: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  _id: string;
  user: Partial<User>;
  track: Partial<Track>;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

export type RepeatMode = 'none' | 'all' | 'one';

export type PlaylistType = 'album' | 'playlist';

export type AnyOfTAP = Track | Artist | Playlist;

export const ACCEPTED_IMAGE_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp']
};

export const ACCEPTED_AUDIO_TYPES = {
  'audio/mpeg': ['.mp3'],
  'audio/wav': ['.wav'],
};


export interface DecodedToken {
  _id: string;
  role: string;
  username: string;
  sub: string;
  exp: number;
}
