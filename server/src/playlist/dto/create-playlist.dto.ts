import { IsMongoId, IsOptional, IsString } from 'class-validator';
import mongoose from "mongoose";
import { IsFormattedDate } from "../validators/is-formatted-date.validator";

export class CreatePlaylistDto {
  @IsString()
  readonly title: string;

  @IsMongoId()
  readonly artist: mongoose.Types.ObjectId;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsString()
  @IsFormattedDate()
  readonly releaseDate?: string;

  @IsOptional()
  @IsString()
  readonly type?: string;
}
