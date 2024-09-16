import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Playlist, PlaylistDocument } from "./playlist.schema";
import mongoose, { Model } from "mongoose";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { FileService, FileType } from "../file/file.service";
import { EditHeaderDto } from "./dto/edit-header.dto";
import { Track, TrackDocument } from "../track/schemas/track.schema";

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>,
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    private fileService: FileService
  ) {}

  private async findPlaylistById(playlistId: mongoose.Types.ObjectId): Promise<PlaylistDocument> {
    const playlist = await this.playlistModel.findById(playlistId).exec();
    if (!playlist) {
      throw new NotFoundException(`Playlist with ID ${playlistId} not found`);
    }
    return playlist;
  }

  async getAllPlaylists(): Promise<Playlist[]> {
    return this.playlistModel.find().exec();
  }

  async getPlaylistById(playlistId: mongoose.Types.ObjectId): Promise<Playlist> {
    return this.findPlaylistById(playlistId);
  }

  async getAllTracksInPlaylist(playlistId: mongoose.Types.ObjectId): Promise<mongoose.Types.ObjectId[]> {
    const existingPlaylist = await this.playlistModel.findById(playlistId).populate('tracks').exec();
    if (!existingPlaylist) {
      throw new NotFoundException(`Playlist with ID ${playlistId} not found`);
    }
    return existingPlaylist.tracks;
  }


  async createPlaylist(playlistDto: CreatePlaylistDto, userId: mongoose.Types.ObjectId) {
    const playlistData = {
      ...playlistDto,
      owner: userId
    }
    return this.playlistModel.create(playlistData);
  }

  async editPlaylistHeader(playlistId: mongoose.Types.ObjectId, editHeaderDto: EditHeaderDto, coverImage: Express.Multer.File): Promise<Playlist> {
    const existingPlaylist = await this.findPlaylistById(playlistId);

    let processedImage;
    if (coverImage) {
      processedImage = await this.fileService.processImage(coverImage, FileType.COVER_IMAGE);
    }

    const patchedPlaylistData = {
      title: editHeaderDto.title || existingPlaylist.title,
      description: editHeaderDto.description || existingPlaylist.description,
      coverImage: processedImage.dynamicPath || existingPlaylist.coverImage,
    }

    if (coverImage && existingPlaylist.coverImage) {
      if (existingPlaylist.coverImage !== processedImage.dynamicPath) {
        this.fileService.deleteFile(existingPlaylist.coverImage);
      }
    }

    return this.playlistModel.findByIdAndUpdate(playlistId, {$set: patchedPlaylistData}, {new: true});
  }

  async editPlaylistTracks(playlistId: mongoose.Types.ObjectId, trackIds: mongoose.Types.ObjectId[]): Promise<Playlist> {
    const existingPlaylist = await this.findPlaylistById(playlistId);

    if (trackIds && trackIds.length > 0) {
      existingPlaylist.tracks = trackIds;
    }

    return existingPlaylist.save();
  }

  async addTrackToPlaylist(playlistId: mongoose.Types.ObjectId, trackId: mongoose.Types.ObjectId): Promise<Playlist> {
    const existingPlaylist = await this.findPlaylistById(playlistId);

    if (existingPlaylist.tracks.includes(trackId)) {
      throw new ConflictException('Track already exists in the playlist');
    } else {
      existingPlaylist.tracks.push(trackId);
    }

    return existingPlaylist.save();
  }

  async addTrackToAlbum(playlistId: mongoose.Types.ObjectId, trackId: mongoose.Types.ObjectId): Promise<Playlist> {
    const existingPlaylist = await this.findPlaylistById(playlistId);
    const track = await this.trackModel.findById(trackId).exec();
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    track.album = playlistId;
    await track.save();

    existingPlaylist.tracks.push(trackId);
    return existingPlaylist.save();
  }


  async removeTracks(playlistId: mongoose.Types.ObjectId, trackIds: mongoose.Types.ObjectId[]): Promise<Playlist> {
    const existingPlaylist = await this.findPlaylistById(playlistId);
    
    existingPlaylist.tracks = existingPlaylist.tracks.filter(trackId =>
      !trackIds.includes(trackId)
    );

    return existingPlaylist.save();
  }

  async deletePlaylist(playlistId: mongoose.Types.ObjectId): Promise<Playlist> {
    const existingPlaylist = await this.findPlaylistById(playlistId)

    if (existingPlaylist.coverImage) {
      this.fileService.deleteFile(existingPlaylist.coverImage);
    }

    return this.playlistModel.findByIdAndDelete(playlistId);
  }
}