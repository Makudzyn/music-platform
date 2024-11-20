import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ArtistDocument = HydratedDocument<Artist>;

@Schema({ timestamps: true })
export class Artist {
  @Prop()
  name: string;
  @Prop()
  artistImage: string;
  @Prop({ default: 0 })
  totalListens: number;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }] })
  albums: mongoose.Types.ObjectId[];
  @Prop()
  aboutInfo: string;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
