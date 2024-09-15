import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { PlaylistService } from "./playlist.service";
import { Playlist } from "./playlist.schema";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import mongoose from "mongoose";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { RemoveTracksDto } from "./dto/remove-tracks.dto";
import { EditHeaderDto } from "./dto/edit-header.dto";
import { PlaylistOwnerGuard } from "./owner.guard";
import { AddTrackDto } from "./dto/add-track.dto";
import { EditTracksDto } from "./dto/edit-tracks.dto";

@Controller('/playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Get('/')
  getAllPlaylists(): Promise<Playlist[]> {
    return this.playlistService.getAllPlaylists();
  }

  @Get('/:playlistId')
  getPlaylistById(@Param('playlistId') playlistId: mongoose.Types.ObjectId): Promise<Playlist> {
    return this.playlistService.getPlaylistById(playlistId);
  }

  @Get('/tracks/:playlistId/')
  getAllTracksInPlaylist(@Param('playlistId') playlistId: mongoose.Types.ObjectId): Promise<mongoose.Types.ObjectId[]> {
    return this.playlistService.getAllTracksInPlaylist(playlistId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'USER')
  @Post('/create')
  @UseInterceptors(FileInterceptor(''))
  createPlaylist(
    @Body() playlistDto: CreatePlaylistDto,
    @Req() req
  ): Promise<Playlist> {
    const userId = req.user.userId;
    return this.playlistService.createPlaylist(playlistDto, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PlaylistOwnerGuard)
  @Roles('ADMIN', 'USER')
  @Patch('/edit-header/:playlistId')
  @UseInterceptors(FileInterceptor('coverImage'))
  editPlaylistHeader(
    @Param('playlistId') playlistId: mongoose.Types.ObjectId,
    @UploadedFile() coverImage: Express.Multer.File,
    @Body() editHeaderDto: EditHeaderDto,
  ) {
    return this.playlistService.editPlaylistHeader(playlistId, editHeaderDto, coverImage);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PlaylistOwnerGuard)
  @Roles('ADMIN', 'USER')
  @Patch('/edit-tracks/:playlistId')
  @UseInterceptors(FileInterceptor(''))
  editPlaylistTracks(
    @Param('playlistId') playlistId: mongoose.Types.ObjectId,
    @Body() editTracksDto: EditTracksDto,
  ): Promise<Playlist> {
    const {tracksIds} = editTracksDto;
    return this.playlistService.editPlaylistTracks(playlistId, tracksIds);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PlaylistOwnerGuard)
  @Roles('ADMIN', 'USER')
  @Patch('/add-track-to-playlist/:playlistId')
  @UseInterceptors(FileInterceptor(''))
  addTrackToPlaylist(
    @Param('playlistId') playlistId: mongoose.Types.ObjectId,
    @Body() addTrackDTO: AddTrackDto
  ): Promise<Playlist> {
    const {trackId} = addTrackDTO;
    return this.playlistService.addTrackToPlaylist(playlistId, trackId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch('/add-track-to-album/:playlistId')
  @UseInterceptors(FileInterceptor(''))
  addTrackToAlbum(
    @Param('playlistId') playlistId: mongoose.Types.ObjectId,
    @Body() addTrackDTO: AddTrackDto
  ): Promise<Playlist> {
    const {trackId} = addTrackDTO;
    return this.playlistService.addTrackToAlbum(playlistId, trackId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PlaylistOwnerGuard)
  @Roles('ADMIN', 'USER')
  @Patch('/remove-tracks/:playlistId')
  @UseInterceptors(FileInterceptor(''))
  removeTracksFromPlaylist(
    @Param('playlistId') playlistId: mongoose.Types.ObjectId,
    @Body() removeTracksDto: RemoveTracksDto
  ): Promise<Playlist> {
    const {trackIds} = removeTracksDto;
    return this.playlistService.removeTracks(playlistId, trackIds);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PlaylistOwnerGuard)
  @Roles('ADMIN', 'USER')
  @Delete('/:playlistId')
  deletePlaylist(
    @Param('playlistId') playlistId: mongoose.Types.ObjectId
  ): Promise<Playlist> {
    return this.playlistService.deletePlaylist(playlistId);
  }
}