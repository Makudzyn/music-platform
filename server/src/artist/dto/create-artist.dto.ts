import { IsMongoId, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateArtistDto {
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsMongoId({ each: true })
  readonly albums: mongoose.Types.ObjectId[];

  @IsString()
  @IsOptional()
  readonly aboutInfo?: string;
}
