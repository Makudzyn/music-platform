import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Playlist, PlaylistDocument } from "./playlist.schema";
import mongoose, { Model, ObjectId } from "mongoose";
import { PlaylistDto } from "./playlist.dto";
import { PatchPlaylistDto } from "./patch-playlist.dto";
import { FileService, FileType } from "../file/file.service";

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>,
    private fileService: FileService
  ) {}

  async createPlaylist(playlistDto: PlaylistDto, userId) {
    const playlistData = {
      ...playlistDto,
      owner: userId
    }
    return this.playlistModel.create(playlistData);
  }

  async patchPlaylist(playlistId: ObjectId, patchPlaylistDto: PatchPlaylistDto, coverImage: Express.Multer.File): Promise<Playlist> {
    const existingPlaylist = await this.playlistModel.findById(playlistId).exec();
    if (!existingPlaylist) {
      throw new NotFoundException(`Playlist with ID ${playlistId} not found`);
    }

    let dynamicImagePath: string | undefined;
    if (coverImage) {
      dynamicImagePath = this.fileService.createFile(FileType.COVER_IMAGE, coverImage).dynamicPath;
    }

    if (patchPlaylistDto.trackIds && patchPlaylistDto.trackIds.length > 0) {
      existingPlaylist.tracks = [
        ...existingPlaylist.tracks,
        ...patchPlaylistDto.trackIds.map(id => new mongoose.Types.ObjectId(id))
      ];
    }

    const patchedPlaylistData = {
      title: patchPlaylistDto.title || existingPlaylist.title,
      description: patchPlaylistDto.description || existingPlaylist.description,
      coverImage: dynamicImagePath || existingPlaylist.coverImage,
      tracks: existingPlaylist.tracks
    }

    const patchedPlaylist = await this.playlistModel.findByIdAndUpdate(playlistId, {$set: patchedPlaylistData}, {new: true});

    if (coverImage && existingPlaylist.coverImage && existingPlaylist.coverImage !== dynamicImagePath) {
      this.fileService.deleteFile(existingPlaylist.coverImage);
    }

    return patchedPlaylist;
  }
}