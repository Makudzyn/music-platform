import { Injectable } from "@nestjs/common";
import { Track } from "./schemas/track.schema";
import { Comment } from "./schemas/comment.schema";
import { Model, ObjectId } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateTrackDto } from "./dto/create-track.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<Track>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>
  ) {}
  async createTrack(dto: CreateTrackDto): Promise<Track> {
    return this.trackModel.create({...dto, listens: 0})
  }
  async getAllTracks(): Promise<Track[]> {
    return this.trackModel.find();
  }
  async getOneTrack(trackId: ObjectId): Promise<Track> {
    return this.trackModel.findById(trackId);
  }
  async deleteTrack(trackId: ObjectId): Promise<Track> {
    return this.trackModel.findByIdAndDelete(trackId);
  }

  //add update

  async createComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId);
    const comment = await this.commentModel.create({...dto});
    track.comments.push(comment._id);
    await track.save()
    return comment;
  }
}