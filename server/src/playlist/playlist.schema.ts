import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type PlaylistDocument = HydratedDocument<Playlist>;

@Schema({timestamps: true})
export class Playlist {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  coverImage: string;
  @Prop()
  releaseDate: string;
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  owner: mongoose.Types.ObjectId;
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Artist'})
  artist: mongoose.Types.ObjectId;
  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Track'}]})
  tracks: mongoose.Types.ObjectId[];
  @Prop({ enum: ['playlist', 'album'], default: 'playlist' })
  type: string; // 'playlist' or 'album'
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);