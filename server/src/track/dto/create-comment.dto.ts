import mongoose from "mongoose";
import { IsMongoId, IsString } from "class-validator";

export class CreateCommentDto {
  @IsMongoId()
  readonly userId: mongoose.Types.ObjectId;

  @IsString()
  readonly text: string;

  @IsMongoId()
  readonly trackId: mongoose.Types.ObjectId;
}