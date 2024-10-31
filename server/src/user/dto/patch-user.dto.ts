import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsString } from "class-validator";

export class PatchUserDto extends PartialType(CreateUserDto) {
  @IsString()
  readonly bio: string;
}