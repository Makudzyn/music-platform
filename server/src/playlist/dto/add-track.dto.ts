import { IsMongoId } from 'class-validator';
import mongoose from 'mongoose';

export class AddTrackDto {
  @IsMongoId()
  trackId: mongoose.Types.ObjectId;
}
