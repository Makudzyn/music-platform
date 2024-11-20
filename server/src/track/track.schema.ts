import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Comment } from '../comment/comment.schema';

export type TrackDocument = HydratedDocument<Track>;

@Schema({ timestamps: true })
export class Track {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' })
  artist: mongoose.Types.ObjectId;
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
  @Prop()
  duration: number;
  @Prop()
  bitrate: string;
  @Prop()
  format: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Playlist',
    required: false,
  })
  album: mongoose.Types.ObjectId;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: mongoose.Types.ObjectId[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);
