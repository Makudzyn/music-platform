import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { IsArray, IsMongoId, IsNumber, IsOptional } from 'class-validator';
import mongoose from 'mongoose';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsOptional()
  @IsNumber()
  readonly listens?: number;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly comments?: mongoose.Types.ObjectId[];
}
