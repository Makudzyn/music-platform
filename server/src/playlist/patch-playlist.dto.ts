import { IsArray, IsOptional, IsString } from 'class-validator';

export class PatchPlaylistDto {
  readonly title?: string;
  readonly description?: string;
  readonly trackIds?: string[];
}