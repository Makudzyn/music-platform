import { Body, Controller, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { PlaylistService } from "./playlist.service";
import { Playlist } from "./playlist.schema";
import { PlaylistDto } from "./playlist.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ObjectId } from "mongoose";
import { PatchPlaylistDto } from "./patch-playlist.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/roles.decorator";

@Controller('/playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}


  @UseGuards(JwtAuthGuard)
  @Post('/create')
  createPlaylist(
    @Body() playlistDto: PlaylistDto,
    @Req() req
  ): Promise<Playlist> {
    const userId = req.user.userId;
    return this.playlistService.createPlaylist(playlistDto, userId);
  }


  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'USER')
  @Patch('/patch/:playlistId')
  @UseInterceptors(FileInterceptor('coverImage'))
  patchPlaylist(
    @Param('playlistId') playlistId: ObjectId,
    @UploadedFile() coverImage: Express.Multer.File,
    @Body() patchPlaylistDto: PatchPlaylistDto,
  ): Promise<Playlist> {
    return this.playlistService.patchPlaylist(playlistId, patchPlaylistDto, coverImage);
  }
}