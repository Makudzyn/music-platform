import mongoose from 'mongoose';
import { IsArray, IsMongoId } from 'class-validator';

export class RemoveTracksDto {
  @IsMongoId({ each: true })
  @IsArray()
  trackIds: mongoose.Types.ObjectId[];
}
