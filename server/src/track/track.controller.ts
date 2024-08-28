import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { TrackService } from "./track.service";
import { Track } from "./schemas/track.schema";
import { Comment } from "./schemas/comment.schema";
import { TrackDto, UpdateTrackDto, PatchTrackDto } from "./dto/track.dto";
import { ObjectId } from "mongoose";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@Controller('/tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'thumbnail', maxCount: 1},
    {name: 'audio', maxCount: 1}
  ]))
  uploadTrack(@UploadedFiles() files, @Body() dto: TrackDto): Promise<Track> {
    const {thumbnail, audio} = files;
    if (!thumbnail || thumbnail.length === 0) {
      throw new Error('Thumbnail file is missing');
    }

    if (!audio || audio.length === 0) {
      throw new Error('Audio file is missing');
    }
    return this.trackService.uploadTrack(dto, thumbnail[0], audio[0]);
  }

  @Get()
  getAllTracks(
    @Query('offset') offset: number = 0,
    @Query('limit') limit: number = 10
  ) {
    return this.trackService.getAllTracks(offset, limit);
  }

  @Get('/search')
  search(@Query('query') query: string): Promise<Track[]> {
    return this.trackService.search(query);
  }

  @Get(':trackId')
  getOneTrack(@Param("trackId") trackId: ObjectId): Promise<Track> {
    return this.trackService.getOneTrack(trackId);
  }

  @Delete('/delete-many')
  deleteManyTracks(@Body('tracksIds') tracksIds: string[]) {
    return this.trackService.deleteManyTracks(tracksIds);
  }

  @Delete('/delete-all')
  deleteAllTracks() {
    return this.trackService.deleteAllTracks();
  }

  @Delete(":trackId")
  deleteTrack(@Param('trackId') trackId: ObjectId): Promise<Track> {
    return this.trackService.deleteTrack(trackId);
  }

  @Put(':trackId')
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'thumbnail', maxCount: 1},
    {name: 'audio', maxCount: 1}
  ]))
  updateTrack(
    @Param('trackId') trackId: ObjectId,
    @UploadedFiles() files,
    @Body() updateTrackDto: UpdateTrackDto
  ): Promise<Track> {
    const {thumbnail, audio} = files;
    return this.trackService.updateTrack(trackId, updateTrackDto, thumbnail[0], audio[0]);
  }

  @Patch(':trackId')
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'thumbnail', maxCount: 1},
    {name: 'audio', maxCount: 1}
  ]))
  patchTrack(
    @Param('trackId') trackId: ObjectId,
    @UploadedFiles() files,
    @Body() patchTrackDto: PatchTrackDto
  ): Promise<Track> {
    const {thumbnail, audio} = files;
    return this.trackService.patchTrack(trackId, patchTrackDto, thumbnail ? thumbnail[0] : undefined, audio ? audio[0] : undefined);
  }

  @Post('/comment')
  createComment(@Body() dto: CreateCommentDto): Promise<Comment> {
    return this.trackService.createComment(dto);
  }

  @Post('/listen/:trackId')
  listen(@Param('trackId') trackId: ObjectId): Promise<void> {
    return this.trackService.listen(trackId)
  }
}