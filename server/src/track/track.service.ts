import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Track, TrackDocument } from "./schemas/track.schema";
import { Comment, CommentDocument } from "./schemas/comment.schema";
import mongoose, { Model, ObjectId } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { TrackDto, PatchTrackDto, UpdateTrackDto } from "./dto/track.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { FileService } from "../file/file.service";
import { getAudioDuration, getFilePaths } from "./track.utils";

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService
  ) {}

  async uploadTrack(trackDto: TrackDto, thumbnail, audio): Promise<Track> {
    const {dynamicThumbnailPath, fullAudioPath, dynamicAudioPath} = getFilePaths(this.fileService, thumbnail, audio);
    const audioDuration = await getAudioDuration(fullAudioPath);

    const trackData = {
      ...trackDto,
      listens: 0,
      audio: dynamicAudioPath,
      thumbnail: dynamicThumbnailPath,
      duration: audioDuration
    };
    return this.trackModel.create(trackData);
  }

  async getAllTracks(offset: number, limit: number): Promise<Track[]> {
    return this.trackModel.find()
    .skip(offset)
    .limit(limit);
  }

  async getOneTrack(trackId: mongoose.Types.ObjectId): Promise<Track> {
    return this.trackModel.findById(trackId)
    .populate('comments');
  }

  async updateTrack(
    trackId: mongoose.Types.ObjectId, updateTrackDto: UpdateTrackDto, thumbnail: Express.Multer.File,
    audio: Express.Multer.File
  ): Promise<Track> {
    const existingTrack = await this.trackModel.findById(trackId).exec();
    if (!existingTrack) {
      throw new NotFoundException(`Track with ID ${trackId} not found`);
    }

    const {dynamicThumbnailPath, fullAudioPath, dynamicAudioPath} = getFilePaths(this.fileService, thumbnail, audio);
    const audioDuration = fullAudioPath ? await getAudioDuration(fullAudioPath) : undefined;


    const updatedTrackData = {
      ...updateTrackDto,
      audio: dynamicAudioPath || existingTrack.audio,
      thumbnail: dynamicThumbnailPath || existingTrack.thumbnail,
      duration: audioDuration || existingTrack.duration
    };

    const updatedTrack = await this.trackModel.findByIdAndUpdate(trackId, updatedTrackData, {new: true});
    if (!updatedTrack) {
      throw new NotFoundException(`Track with ID ${trackId} not found`);
    }

    if (thumbnail && existingTrack.thumbnail) {
      this.fileService.deleteFile(existingTrack.thumbnail);
    }
    if (audio && existingTrack.audio) {
      this.fileService.deleteFile(existingTrack.audio);
    }

    return updatedTrack;
  }

  async patchTrack(
    trackId: mongoose.Types.ObjectId, patchTrackDto: PatchTrackDto,
    thumbnail?: Express.Multer.File | undefined,
    audio?: Express.Multer.File | undefined
  ): Promise<Track> {
    const existingTrack = await this.trackModel.findById(trackId).exec();
    if (!existingTrack) {
      throw new NotFoundException(`Track with ID ${trackId} not found`);
    }

    const {dynamicThumbnailPath, fullAudioPath, dynamicAudioPath} = getFilePaths(this.fileService, thumbnail, audio);
    const audioDuration = fullAudioPath ? await getAudioDuration(fullAudioPath) : undefined;


    const patchedTrackData = {
      ...patchTrackDto,
      audio: dynamicAudioPath || existingTrack.audio,
      thumbnail: dynamicThumbnailPath || existingTrack.thumbnail,
      duration: audioDuration || existingTrack.duration
    };

    const patchedTrack = await this.trackModel.findByIdAndUpdate(trackId, {$set: patchedTrackData}, {new: true});

    if (thumbnail && existingTrack.thumbnail && existingTrack.thumbnail !== dynamicThumbnailPath) {
      this.fileService.deleteFile(existingTrack.thumbnail);
    }
    if (audio && existingTrack.audio && existingTrack.audio !== dynamicAudioPath) {
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
    const track= await this.trackModel.findById(trackId).exec();
    if (!track) {throw new Error('Track not found')}
    track.listens += 1;
    await track.save();
  }

  async search(query: string): Promise<Track[]> {
    return this.trackModel.find({
      title: {$regex: new RegExp(query, 'i')}
    }).exec();
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

    await this.trackModel.deleteMany({_id: {$in: tracksIds}})
    .exec();
  }

  async deleteAllTracks(): Promise<void> {
    const tracks = await this.trackModel.find()
    .exec();

    await Promise.all(tracks.map(async track => {
      await this.fileService.deleteFile(track.audio);
      await this.fileService.deleteFile(track.thumbnail);
    }));

    await this.trackModel.deleteMany({})
    .exec();
  }

}