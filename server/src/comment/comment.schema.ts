import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({timestamps: true})
export class Comment {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user: string;
  @Prop()
  text: string;
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Track'})
  track: mongoose.Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);