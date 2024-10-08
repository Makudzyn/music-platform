import { PartialType } from "@nestjs/mapped-types";
import { CreatePlaylistDto } from "./create-playlist.dto";

export class EditInfoDto extends PartialType(CreatePlaylistDto) {}