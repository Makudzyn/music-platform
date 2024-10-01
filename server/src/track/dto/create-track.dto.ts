import { IsMongoId, IsOptional, IsString } from "class-validator";
import mongoose from "mongoose";

export class CreateTrackDto {
  @IsMongoId()
  readonly artist: mongoose.Types.ObjectId;

  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly lyrics?: string;

  @IsOptional()
  @IsMongoId()
  readonly album?: mongoose.Types.ObjectId;
}