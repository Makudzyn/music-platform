import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Playlist, PlaylistDocument } from "./playlist.schema";
import mongoose, { Model } from "mongoose";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { FileService, FileType } from "../file/file.service";
import { EditInfoDto } from "./dto/edit-info.dto";
import { Track, TrackDocument } from "../track/schemas/track.schema";
import { Artist, ArtistDocument } from "../artist/artist.schema";

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>,
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
    private fileService: FileService
  ) {}

  private async findPlaylistById(playlistId: mongoose.Types.ObjectId): Promise<PlaylistDocument> {
    const playlist = await this.playlistModel.findById(playlistId).exec();
    if (!playlist) {
      throw new NotFoundException(`Playlist with ID ${playlistId} not found`);
    }
    return playlist;
  }

  async getAllPlaylists(limit: number): Promise<Playlist[]> {
    return this.playlistModel
    .find()
    .limit(limit)
    .populate('tracks', '_id title')
    .populate('owner', '_id username')
    .exec();
  }

  async getAllAlbums(limit: number): Promise<Playlist[]> {
    return this.playlistModel
    .find({type: 'album'})
    .limit(limit)
    .populate('tracks', '_id title')
    .populate('artist', '_id name')
    .exec()
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

  async createPlaylist(createPlaylistDto: CreatePlaylistDto, userId: mongoose.Types.ObjectId) {
    const artist = await this.artistModel.findById(createPlaylistDto.artist).exec();
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${createPlaylistDto.artist} not found`);
    }

    const playlistData = {
      ...createPlaylistDto,
      owner: userId
    }
    const album = await this.playlistModel.create(playlistData);

    artist.albums.push(album._id);
    await artist.save()
    return album;
  }

  async editPlaylistInfo(playlistId: mongoose.Types.ObjectId, editInfoDto: EditInfoDto, coverImage: Express.Multer.File): Promise<Playlist> {
    const existingPlaylist = await this.findPlaylistById(playlistId);

    let processedImage;
    if (coverImage) {
      processedImage = await this.fileService.processImage(coverImage, FileType.COVER_IMAGE);
    }

    const patchedPlaylistData = {
      title: editInfoDto.title || existingPlaylist.title,
      artist: editInfoDto.artist || editInfoDto.artist,
      description: editInfoDto.description || existingPlaylist.description,
      type: editInfoDto.type || existingPlaylist.type,
      releaseDate: editInfoDto.releaseDate || existingPlaylist.releaseDate,
      coverImage: processedImage ? processedImage.dynamicPath : existingPlaylist.coverImage,
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
    //TODO delete from artist
    if (existingPlaylist.coverImage) {
      this.fileService.deleteFile(existingPlaylist.coverImage);
    }

    return this.playlistModel.findByIdAndDelete(playlistId);
  }


}