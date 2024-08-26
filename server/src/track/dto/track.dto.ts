import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class TrackDto {
  @IsString()
  readonly artist: string;

  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly lyrics?: string;
}

export class UpdateTrackDto extends TrackDto{
  @IsOptional()
  @IsNumber()
  readonly listens?: number;

  @IsOptional()
  @IsArray()
  readonly comments?: string[];
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
  readonly comments?: string[];
}


