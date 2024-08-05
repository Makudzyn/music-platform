import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { TrackService } from "./track.service";
import { Track } from "./schemas/track.schema";
import { Comment } from "./schemas/comment.schema";
import { CreateTrackDto } from "./dto/create-track.dto";
import { ObjectId } from "mongoose";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Controller('/tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}
  @Post()
  createTrack(@Body() dto: CreateTrackDto): Promise<Track> {
    return this.trackService.createTrack(dto);
  }

  @Get()
  getAllTracks() {
    return this.trackService.getAllTracks();
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
}