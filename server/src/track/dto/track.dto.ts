import { IsArray, IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
import mongoose from "mongoose";

export class TrackDto {
  @IsString()
  readonly artist: string;

  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly lyrics?: string;

  @IsOptional()
  @IsString()
  readonly album?: string;
}

export class UpdateTrackDto extends TrackDto {
  @IsOptional()
  @IsNumber()
  readonly listens?: number;

  @IsOptional()
  @IsArray()
  @IsMongoId({each: true})
  readonly comments?: mongoose.Types.ObjectId[];
}

export class PatchTrackDto {
  @IsOptional()
  @IsString()
  readonly artist?: string;

  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly lyrics?: string;

  @IsOptional()
  @IsNumber()
  readonly listens?: number;

  @IsOptional()
  @IsArray()
  @IsMongoId({each: true})
  readonly comments?: mongoose.Types.ObjectId[];
}


