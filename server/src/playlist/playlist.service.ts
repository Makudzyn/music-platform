import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Playlist, PlaylistDocument } from "./playlist.schema";
import { Model } from "mongoose";

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>,
  ) {}

}