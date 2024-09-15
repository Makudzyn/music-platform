import mongoose from "mongoose";
import { IsMongoId, IsString } from "class-validator";

export class CreateCommentDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly text: string;

  @IsMongoId()
  readonly trackId: mongoose.Types.ObjectId;
}