import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps: true})
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  role: string;

  @Prop()
  passwordHash: string;

  @Prop()
  profilePicture: string;

  @Prop()
  isVerified: boolean;

  @Prop()
  verificationToken: string;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Playlist'}]})
  playlists: mongoose.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);