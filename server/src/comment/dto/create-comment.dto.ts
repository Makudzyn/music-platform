import mongoose from 'mongoose';
import { IsMongoId, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsMongoId()
  readonly user: mongoose.Types.ObjectId;

  @IsString()
  readonly text: string;

  @IsMongoId()
  readonly track: mongoose.Types.ObjectId;
}
