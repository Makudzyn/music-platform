import { IsArray, IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
import mongoose from "mongoose";
import { PartialType } from "@nestjs/mapped-types";
import { CreateTrackDto } from "./create-track.dto";

export class PatchTrackDto extends PartialType(CreateTrackDto) {
  @IsOptional()
  @IsMongoId()
  readonly artist?: mongoose.Types.ObjectId;

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


