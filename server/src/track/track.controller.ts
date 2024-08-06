import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { TrackService } from "./track.service";
import { Track } from "./schemas/track.schema";
import { Comment } from "./schemas/comment.schema";
import { CreateTrackDto } from "./dto/create-track.dto";
import { ObjectId } from "mongoose";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@Controller('/tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}
  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
  ]))
  createTrack(@UploadedFiles() files, @Body() dto: CreateTrackDto): Promise<Track> {
    const {thumbnail, audio} = files;
    return this.trackService.createTrack(dto, thumbnail[0], audio[0]);
  }

  @Get()
  getAllTracks(
    @Query('offset') offset: number = 0,
    @Query('limit') limit: number = 10) {
    return this.trackService.getAllTracks(offset, limit);
  }

  @Get('/search')
  search(@Query('query') query: string): Promise<Track[]> {
    return this.trackService.search(query);
  }

  @Get(":trackId")
  getOneTrack(@Param("trackId") trackId: ObjectId): Promise<Track> {
    return this.trackService.getOneTrack(trackId);
  }

  @Delete(":trackId")
  deleteTrack(@Param("trackId") trackId: ObjectId): Promise<Track> {
    return this.trackService.deleteTrack(trackId);
  }

  //add update

  @Post('/comment')
  createComment(@Body() dto: CreateCommentDto): Promise<Comment> {
    return this.trackService.createComment(dto);
  }

  @Post('/listen')
  listen(@Param("trackId") trackId: ObjectId): Promise<void> {
    return this.trackService.listen(trackId)
  }
}