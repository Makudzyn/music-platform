import { IsArray, IsMongoId } from "class-validator";
import mongoose from "mongoose";

export class EditTracksDto {
  @IsMongoId({each: true})
  @IsArray()
  readonly tracksIds: mongoose.Types.ObjectId[];
}