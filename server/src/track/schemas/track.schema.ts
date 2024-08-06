import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Comment } from "./comment.schema";

export type TrackDocument = HydratedDocument<Track>;

@Schema()
export class Track {
  @Prop()
  artist: string;
  @Prop()
  title: string;
  @Prop()
  lyrics: string;
  @Prop()
  listens: number;
  @Prop()
  thumbnail: string;
  @Prop()
  audio: string;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]})
  comments: mongoose.Types.ObjectId[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);