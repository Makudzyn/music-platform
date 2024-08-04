import { Injectable } from "@nestjs/common";
import { Track } from "./schemas/track.schema";
import { Comment } from "./schemas/comment.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<Track>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>
  ) {}
  async createTrack(): Promise<Track> {
    const newTrack = new this.trackModel.create({})
  }
  async getAllTracks(): Promise<Track[]> {

  }
  async getOneTrack(trackId: number): Promise<Track> {

  }
  async deleteTrack(trackId: number) {

  }
}