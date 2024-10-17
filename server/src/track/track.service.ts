import { HttpException, HttpStatus, Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { Track, TrackDocument } from "./schemas/track.schema";
import { Comment, CommentDocument } from "./schemas/comment.schema";
import mongoose, { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { PatchTrackDto } from "./dto/patch-track.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { FileService, FileType } from "../file/file.service";
import { Artist, ArtistDocument } from "../artist/artist.schema";
import { CreateTrackDto } from "./dto/create-track.dto";
import { UpdateTrackDto } from "./dto/update-track.dto";
import { Playlist, PlaylistDocument } from "../playlist/playlist.schema";

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
    @InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>,
    private fileService: FileService
  ) {}

  async uploadTrack(createTrackDto: CreateTrackDto, thumbnail: Express.Multer.File, audio: Express.Multer.File): Promise<Track> {
    const artist = await this.artistModel.findById(createTrackDto.artist);
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${createTrackDto.artist} not found`);
    }

    const album = await this.playlistModel.findById(createTrackDto.album).exec();
    if (!album) {
      throw new NotFoundException(`Playlist with ID ${createTrackDto.album} not found`);
    } else if (album.type !== 'album') {
      throw new NotAcceptableException(`Playlist must be type of album, but it's not. Id: ${createTrackDto.album}`);
    }

    const processedImage = await this.fileService.processImage(thumbnail, FileType.THUMBNAIL)
    const processedAudio = await this.fileService.processAudio(audio);

    const trackData = {
      ...createTrackDto,
      listens: 0,
      thumbnail: processedImage.dynamicPath,
      audio: processedAudio.dynamicPath,
      duration: processedAudio.metadata.duration,
      bitrate: processedAudio.metadata.bitrate,
      format: processedAudio.metadata.format
    };
    const track = await this.trackModel.create(trackData);

    // Обновляем Playlist, добавляя в него новый трек
    album.tracks.push(track._id);
    await album.save();

    return track;
  }

  async getAllTracks(offset: number, limit: number): Promise<Track[]> {
    return this.trackModel.find()
    .skip(offset)
    .limit(limit)
    .populate('artist', '_id name')
    .populate('album', '_id title owner')
    .exec();
  }

  async getAllTracksByArtist(artistId: mongoose.Types.ObjectId) {
    const artist = await this.artistModel.findById(artistId)
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${artistId} not found`);
    }
    return this.trackModel
    .find({artist: artistId})
    .populate('artist', '_id name')
    .populate('album', '_id title')
    .exec()
  }

  async getAllTracksByAlbum(albumId: mongoose.Types.ObjectId) {
    const album = await this.playlistModel.findById(albumId);
    if (!album) {
      throw new NotFoundException(`Album with ID ${albumId} not found`);
    }
    return this.trackModel
    .find({album: albumId})
    .populate('album', '_id name')
    .populate('artist', '_id title')
    .exec()
  }

  async getOneTrack(trackId: mongoose.Types.ObjectId): Promise<Track> {
    return this.trackModel.findById(trackId)
    .populate(['comments', 'artist'])
    .exec();
  }

  async patchTrack(
    trackId: mongoose.Types.ObjectId,
    patchTrackDto: PatchTrackDto,
    thumbnail?: Express.Multer.File | undefined,
    audio?: Express.Multer.File | undefined
  ): Promise<Track> {
    const existingTrack = await this.trackModel.findById(trackId).exec();

    if (!existingTrack) {
      throw new NotFoundException(`Track with ID ${trackId} not found`);
    }

    if (patchTrackDto.artist) {
      const artist = await this.artistModel.findById(patchTrackDto.artist);
      if (!artist) {
        throw new NotFoundException(`Artist with ID ${patchTrackDto.artist} not found`);
      }
    }

    if (patchTrackDto.album) {
      const album = await this.playlistModel.findById(patchTrackDto.album).exec();
      if (!album) {
        throw new NotFoundException(`Album with ID ${patchTrackDto.album} not found`);
      } else if (album.type !== 'album') {
        throw new NotAcceptableException(`Playlist must be type of album, but it's not. Id: ${patchTrackDto.album}`);
      }
    }

    let processedImage;
    if (thumbnail) {
      processedImage = await this.fileService.processImage(thumbnail, FileType.THUMBNAIL)
    }
    let processedAudio;
    if (audio) {
      processedAudio = await this.fileService.processAudio(audio);
    }

    const patchedTrackData = {
      ...patchTrackDto,
      thumbnail: processedImage ? processedImage.dynamicPath : existingTrack.thumbnail,
      audio: processedAudio ? processedAudio.dynamicPath : existingTrack.audio,
      duration: processedAudio ? processedAudio.metadata.duration : existingTrack.duration,
      bitrate: processedAudio ? processedAudio.metadata.bitrate : existingTrack.bitrate,
      format: processedAudio ? processedAudio.metadata.format : existingTrack.format
    };

    const patchedTrack = await this.trackModel.findByIdAndUpdate(trackId, {$set: patchedTrackData}, {new: true});

    if (thumbnail && existingTrack.thumbnail && existingTrack.thumbnail !== processedImage.dynamicPath) {
      this.fileService.deleteFile(existingTrack.thumbnail);
    }
    if (audio && existingTrack.audio && existingTrack.audio !== processedAudio.dynamicPath) {
      this.fileService.deleteFile(existingTrack.audio);
    }

    return patchedTrack;
  }

  async createComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId).exec();

    if (!track) {throw new Error('Track not found')}
    const comment = await this.commentModel.create({...dto});
    track.comments.push(comment._id);
    await track.save();
    return comment;
  }

  async listen(trackId: mongoose.Types.ObjectId): Promise<void> {
    const track = await this.trackModel.findById(trackId).exec();

    if (!track) {throw new Error('Track not found')}
    track.listens += 1;
    await track.save();
  }

  async search(query: string): Promise<Track[]> {
    return this.trackModel.find({
      $or: [
        {title: {$regex: new RegExp(query, 'i')}},  // поиск по названию трека
        // {artist: {$regex: new RegExp(query, 'i')}}, // поиск по исполнителю
        // {album: {$regex: new RegExp(query, 'i')}}  // поиск по альбому
      ]
    })
    // .populate('artist')
    // .populate('album')
    .exec();
  }

  async deleteTrack(trackId: mongoose.Types.ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(trackId).exec();

    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    this.fileService.deleteFile(track.audio);
    this.fileService.deleteFile(track.thumbnail);
    return this.trackModel.findByIdAndDelete(trackId);
  }

  async deleteManyTracks(tracksIds: string[]): Promise<void> {
    const tracks = await this.trackModel
    .find({_id: {$in: tracksIds}})
    .exec();

    await Promise.all(tracks.map(async track => {
      await this.fileService.deleteFile(track.audio);
      await this.fileService.deleteFile(track.thumbnail);
    }));

    await this.trackModel.deleteMany({_id: {$in: tracksIds}}).exec();
  }

  async deleteAllTracks(): Promise<void> {
    const tracks = await this.trackModel.find().exec();

    await Promise.all(tracks.map(async track => {
      await this.fileService.deleteFile(track.audio);
      await this.fileService.deleteFile(track.thumbnail);
    }));

    await this.trackModel.deleteMany({}).exec();
  }


}