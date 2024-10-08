import { IsArray, IsMongoId, IsNumber, IsOptional } from "class-validator";
import mongoose from "mongoose";
import { PartialType } from "@nestjs/mapped-types";
import { CreateTrackDto } from "./create-track.dto";

export class PatchTrackDto extends PartialType(CreateTrackDto) {
  @IsOptional()
  @IsNumber()
  readonly listens?: number;

  @IsOptional()
  @IsArray()
  @IsMongoId({each: true})
  readonly comments?: mongoose.Types.ObjectId[];
}


