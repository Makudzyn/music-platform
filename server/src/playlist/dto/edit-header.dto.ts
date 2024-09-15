import { IsOptional, IsString } from "class-validator";

export class EditHeaderDto {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;
}