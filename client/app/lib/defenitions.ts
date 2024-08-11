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