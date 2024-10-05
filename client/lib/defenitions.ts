export type Track = {
  _id: string;
  artist: Artist;
  album: Album;
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

export type Artist = {
  _id: string;
  name: string;
  artistImage: string;
  aboutInfo: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Album = {
  _id: string;
  title: string;
  description: string;
  coverImage: string;
  owner: User;
  createdAt: Date;
  updatedAt: Date;
}

export type User = {
  _id: string;
  username: string;
  email: string;
  role: string;
  isVerified: boolean;
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

export type DecodedToken = {
  role: string;
  sub: string;
  exp: number;
}
