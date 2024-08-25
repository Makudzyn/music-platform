import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Track, TrackDocument } from "./schemas/track.schema";
import { Comment, CommentDocument } from "./schemas/comment.schema";
import { Model, ObjectId } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { TrackDto, PatchTrackDto, UpdateTrackDto } from "./dto/track.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { FileService, FileType } from "../file/file.service";
import { getAudioDuration } from "./track.utils";

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService
  ) {}

  async uploadTrack(trackDto: TrackDto, thumbnail, audio): Promise<Track> {
    const {dynamicPath: thumbnailPath} = this.fileService.createFile(FileType.THUMBNAIL, thumbnail)
    const {fullFilePath: fullAudioPath, dynamicPath: dynamicAudioPath} = this.fileService.createFile(
      FileType.AUDIO, audio)
    const audioDuration = await getAudioDuration(fullAudioPath);

    const trackData = {...trackDto, listens: 0, audio: dynamicAudioPath, thumbnail: thumbnailPath, duration: audioDuration};
    return this.trackModel.create(trackData);
  }

  async getAllTracks(offset: number, limit: number): Promise<Track[]> {
    return this.trackModel.find()
    .skip(offset)
    .limit(limit);
  }

  async getOneTrack(trackId: ObjectId): Promise<Track> {
    return this.trackModel.findById(trackId)
    .populate('comments');
  }

  async updateTrack(trackId: ObjectId, updateTrackDto: UpdateTrackDto, thumbnail: Express.Multer.File, audio: Express.Multer.File): Promise<Track> {
    const {dynamicPath: thumbnailPath} = this.fileService.createFile(FileType.THUMBNAIL, thumbnail)
    const {fullFilePath: fullAudioPath, dynamicPath: dynamicAudioPath} = this.fileService.createFile(
      FileType.AUDIO, audio)
    const audioDuration = await getAudioDuration(fullAudioPath);

    const updatedTrackData = {...updateTrackDto, audio: dynamicAudioPath, thumbnail: thumbnailPath, duration: audioDuration};

    const updatedTrack = await this.trackModel.findByIdAndUpdate(trackId, updatedTrackData, { new: true });
    if (!updatedTrack) {
      throw new NotFoundException(`Track with ID ${trackId} not found`);
    }
    return updatedTrack;
  }

  async patchTrack(trackId: ObjectId, patchTrackDto: PatchTrackDto): Promise<Track> {
    console.log('Patching Track:', trackId, patchTrackDto);
    const patchedTrack = await this.trackModel.findByIdAndUpdate(trackId, {$set: patchTrackDto}, {new: true});
    if (!patchedTrack) {
      throw new NotFoundException(`Track with ID ${trackId} not found`);
    }
    return patchedTrack;
  }

  async createComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId)
    .exec();
    if (!track) {throw new Error('Track not found')}
    const comment = await this.commentModel.create({...dto});
    track.comments.push(comment._id);
    await track.save();
    return comment;
  }

  async listen(trackId: ObjectId): Promise<void> {
    const track = await this.trackModel.findById(trackId)
    .exec();
    if (!track) {throw new Error('Track not found')}
    track.listens += 1;
    await track.save();
  }

  async search(query: string): Promise<Track[]> {
    return this.trackModel.find({
      title: {$regex: new RegExp(query, 'i')}
    })
    .exec();
  }

  async deleteTrack(trackId: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(trackId)
    .exec();
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    this.fileService.deleteFile(track.audio);
    this.fileService.deleteFile(track.thumbnail);
    return this.trackModel.findByIdAndDelete(trackId);
  }

  async deleteManyTracks(tracksIds: string[]): Promise<void> {
    const tracks = await this.trackModel.find({_id: {$in: tracksIds}})
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