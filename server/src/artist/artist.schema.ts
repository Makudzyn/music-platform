import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ArtistDocument = HydratedDocument<Artist>;

@Schema({timestamps: true})
export class Artist {
  @Prop()
  name: string;
  @Prop()
  artistImage: string;
  @Prop()
  aboutInfo: string;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);