import { IsOptional, IsString } from 'class-validator';

export class CreatePlaylistDto {
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsString()
  readonly type?: string;
}
