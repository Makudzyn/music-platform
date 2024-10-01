import { IsOptional, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly aboutInfo?: string;
}
