import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

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
  comment: Comment[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);