import { IsMongoId, IsOptional, IsString } from 'class-validator';
import mongoose from "mongoose";

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
  readonly releaseDate?: string;

  @IsOptional()
  @IsString()
  readonly type?: string;
}
