import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Track } from "./schemas/track.schema";
import { Comment } from "./schemas/comment.schema";
import { Model, ObjectId, Query } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateTrackDto } from "./dto/create-track.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { FileService, FileType } from "../file/file.service";

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<Track>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    private fileService: FileService,
  ) {}
  async createTrack(dto: CreateTrackDto, thumbnail, audio): Promise<Track> {
    const thumbnailPath = this.fileService.createFile(FileType.THUMBNAIL, thumbnail)
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio)
    return this.trackModel.create({...dto, listens: 0, audio: audioPath, thumbnail: thumbnailPath})
  }
  async getAllTracks(offset: number, limit: number): Promise<Track[]> {
    return this.trackModel.find().skip(offset).limit(limit);
  }
  async getOneTrack(trackId: ObjectId): Promise<Track> {
    return this.trackModel.findById(trackId).populate('comments');
  }



  //add update

  async createComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId).exec();
    if (!track) {throw new Error('Track not found')}
    const comment = await this.commentModel.create({...dto});
    track.comments.push(comment._id);
    await track.save();
    return comment;
  }

  async listen(trackId: ObjectId): Promise<void> {
    const track = await this.trackModel.findById(trackId).exec();
    if (!track) {throw new Error('Track not found')}
    track.listens += 1;
    await track.save();
  }

  async search(query: string): Promise<Track[]> {
    return this.trackModel.find({
      title: {$regex: new RegExp(query, 'i')},
    }).exec();
  }

  async deleteTrack(trackId: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(trackId).exec();
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    this.fileService.deleteFile(track.audio);
    this.fileService.deleteFile(track.thumbnail);
    return this.trackModel.findByIdAndDelete(trackId);
  }

  async deleteManyTracks(tracksIds: string[]): Promise<void> {
    const tracks = await this.trackModel.find({ _id: { $in: tracksIds } }).exec();

    await Promise.all(tracks.map(async track => {
      await this.fileService.deleteFile(track.audio);
      await this.fileService.deleteFile(track.thumbnail);
    }));

    await this.trackModel.deleteMany({ _id: { $in: tracksIds } }).exec();
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