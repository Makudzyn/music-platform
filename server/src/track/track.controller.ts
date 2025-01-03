import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from './track.schema';
import { PatchTrackDto } from './dto/patch-track.dto';
import mongoose from 'mongoose';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTrackDto } from './dto/create-track.dto';
import { Artist } from '../artist/artist.schema';
import { Playlist } from '../playlist/playlist.schema';

@Controller('/tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('/upload')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  uploadTrack(
    @UploadedFiles() files,
    @Body() createTrackDto: CreateTrackDto,
  ): Promise<Track> {
    const { thumbnail, audio } = files;
    if (!thumbnail || thumbnail.length === 0) {
      throw new Error('Thumbnail file is missing');
    }

    if (!audio || audio.length === 0) {
      throw new Error('Audio file is missing');
    }
    return this.trackService.uploadTrack(
      createTrackDto,
      thumbnail[0],
      audio[0],
    );
  }

  @Get()
  getAllTracks(
    @Query('limit', new DefaultValuePipe(0), ParseIntPipe) limit: number,
  ) {
    return this.trackService.getAllTracks(limit);
  }

  @Get('/by-artist/:artistId')
  getAllTracksByArtistId(@Param('artistId') artistId: mongoose.Types.ObjectId) {
    return this.trackService.getAllTracksByArtistId(artistId);
  }

  @Get('/by-album/:albumId')
  getAllTrackByAlbumId(@Param('albumId') albumId: mongoose.Types.ObjectId) {
    return this.trackService.getAllTracksByAlbumId(albumId);
  }

  @Get('/search')
  search(
    @Query('query') query: string,
  ): Promise<{ tracks: Track[]; playlists: Playlist[]; artists: Artist[] }> {
    return this.trackService.search(query);
  }

  @Get(':trackId')
  getTrackById(
    @Param('trackId') trackId: mongoose.Types.ObjectId,
  ): Promise<Track> {
    return this.trackService.getTrackById(trackId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete('/delete-many')
  deleteManyTracks(@Body('tracksIds') tracksIds: string[]) {
    return this.trackService.deleteManyTracks(tracksIds);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete('/delete-all')
  deleteAllTracks() {
    return this.trackService.deleteAllTracks();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':trackId')
  deleteTrack(
    @Param('trackId') trackId: mongoose.Types.ObjectId,
  ): Promise<Track> {
    return this.trackService.deleteTrack(trackId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':trackId')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  patchTrack(
    @Param('trackId') trackId: mongoose.Types.ObjectId,
    @UploadedFiles() files,
    @Body() patchTrackDto: PatchTrackDto,
  ): Promise<Track> {
    const { thumbnail, audio } = files;
    return this.trackService.patchTrack(
      trackId,
      patchTrackDto,
      thumbnail ? thumbnail[0] : undefined,
      audio ? audio[0] : undefined,
    );
  }

  @Post('/listen/:trackId')
  listen(@Param('trackId') trackId: mongoose.Types.ObjectId): Promise<void> {
    return this.trackService.listen(trackId);
  }
}
