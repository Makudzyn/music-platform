import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Track, TrackDocument } from "./schemas/track.schema";
import { Comment, CommentDocument } from "./schemas/comment.schema";
import mongoose, { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { PatchTrackDto, TrackDto, UpdateTrackDto } from "./dto/track.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { FileService, FileType } from "../file/file.service";

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService
  ) {}

  async uploadTrack(trackDto: TrackDto, thumbnail, audio): Promise<Track> {
    const processedImage = await this.fileService.processImage(thumbnail, FileType.THUMBNAIL)
    const processedAudio = await this.fileService.processAudio(audio);

    console.log(processedAudio.metadata)
    const trackData = {
      ...trackDto,
      listens: 0,
      thumbnail: processedImage.dynamicPath,
      audio: processedAudio.dynamicPath,
      duration: processedAudio.metadata.duration,
      bitrate: processedAudio.metadata.bitrate,
      format: processedAudio.metadata.format,
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
    trackId: mongoose.Types.ObjectId,
    updateTrackDto: UpdateTrackDto,
    thumbnail: Express.Multer.File,
    audio: Express.Multer.File
  ): Promise<Track> {
    const existingTrack = await this.trackModel.findById(trackId).exec();
    if (!existingTrack) {
      throw new NotFoundException(`Track with ID ${trackId} not found`);
    }

    const processedImage = await this.fileService.processImage(thumbnail, FileType.THUMBNAIL)
    const processedAudio = await this.fileService.processAudio(audio);

    const updatedTrackData = {
      ...updateTrackDto,
      thumbnail: processedImage.dynamicPath || existingTrack.thumbnail,
      audio: processedAudio.dynamicPath || existingTrack.audio,
      duration: processedAudio.metadata.duration || existingTrack.duration,
      bitrate: processedAudio.metadata.bitrate || existingTrack.bitrate,
      format: processedAudio.metadata.format || existingTrack.format,
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
      format: processedAudio ? processedAudio.metadata.format : existingTrack.format,
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
    const track= await this.trackModel.findById(trackId).exec();
    if (!track) {throw new Error('Track not found')}
    track.listens += 1;
    await track.save();
  }

  async search(query: string): Promise<Track[]> {
    return this.trackModel.find({
      $or: [
        { title: { $regex: new RegExp(query, 'i') } },  // поиск по названию трека
        { artist: { $regex: new RegExp(query, 'i') } }  // поиск по исполнителю
      ]
    })
    .populate('album', 'title')
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