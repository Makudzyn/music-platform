import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { Track, TrackDocument } from './track.schema';
import { Comment, CommentDocument } from '../comment/comment.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PatchTrackDto } from './dto/patch-track.dto';
import { FileService, FileType } from '../file/file.service';
import { Artist, ArtistDocument } from '../artist/artist.schema';
import { CreateTrackDto } from './dto/create-track.dto';
import { Playlist, PlaylistDocument } from '../playlist/playlist.schema';
import { User, UserDocument } from '../user/user.schema';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
    @InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private fileService: FileService,
  ) {}

  async uploadTrack(
    createTrackDto: CreateTrackDto,
    thumbnail: Express.Multer.File,
    audio: Express.Multer.File,
  ): Promise<Track> {
    const artist = await this.artistModel.findById(createTrackDto.artist);
    if (!artist) {
      throw new NotFoundException(
        `Artist with ID ${createTrackDto.artist} not found`,
      );
    }

    const album = await this.playlistModel
      .findById(createTrackDto.album)
      .exec();
    if (!album) {
      throw new NotFoundException(
        `Playlist with ID ${createTrackDto.album} not found`,
      );
    } else if (album.type !== 'album') {
      throw new NotAcceptableException(
        `Playlist must be type of album, but it's not. Id: ${createTrackDto.album}`,
      );
    }

    const processedImage = await this.fileService.processImage(
      thumbnail,
      FileType.THUMBNAIL,
    );
    const processedAudio = await this.fileService.processAudio(audio);

    const trackData = {
      ...createTrackDto,
      listens: 0,
      thumbnail: processedImage.dynamicPath,
      audio: processedAudio.dynamicPath,
      duration: processedAudio.metadata.duration,
      bitrate: processedAudio.metadata.bitrate,
      format: processedAudio.metadata.format,
    };
    const track = await this.trackModel.create(trackData);

    // Updating Playlist with new track
    album.tracks.push(track._id);
    await album.save();

    return track;
  }

  async getAllTracks(limit: number): Promise<Track[]> {
    return this.trackModel
      .find()
      .limit(limit)
      .populate('artist', '_id name')
      .populate('album', '_id title owner')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: '_id username avatar',
        },
        select: 'text createdAt',
      })
      .exec();
  }

  async getAllTracksByArtistId(artistId: mongoose.Types.ObjectId) {
    const artist = await this.artistModel.findById(artistId);
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${artistId} not found`);
    }
    return this.trackModel
      .find({ artist: artistId })
      .populate('artist', '_id name')
      .populate('album', '_id title')
      .exec();
  }

  async getAllTracksByAlbumId(albumId: mongoose.Types.ObjectId) {
    const album = await this.playlistModel.findById(albumId);
    if (!album) {
      throw new NotFoundException(`Album with ID ${albumId} not found`);
    }
    return this.trackModel
      .find({ album: albumId })
      .populate('artist', '_id name')
      .populate('album', '_id title')
      .exec();
  }

  async getTrackById(trackId: mongoose.Types.ObjectId): Promise<Track> {
    return this.trackModel
      .findById(trackId)
      .populate('album', '_id title')
      .populate('artist', '_id name')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: '_id username avatar',
        },
        select: 'text createdAt',
      })
      .exec();
  }

  async patchTrack(
    trackId: mongoose.Types.ObjectId,
    patchTrackDto: PatchTrackDto,
    thumbnail?: Express.Multer.File | undefined,
    audio?: Express.Multer.File | undefined,
  ): Promise<Track> {
    const existingTrack = await this.trackModel.findById(trackId).exec();

    if (!existingTrack) {
      throw new NotFoundException(`Track with ID ${trackId} not found`);
    }

    if (patchTrackDto.artist) {
      const artist = await this.artistModel.findById(patchTrackDto.artist);
      if (!artist) {
        throw new NotFoundException(
          `Artist with ID ${patchTrackDto.artist} not found`,
        );
      }
    }

    if (patchTrackDto.album) {
      const album = await this.playlistModel
        .findById(patchTrackDto.album)
        .exec();
      if (!album) {
        throw new NotFoundException(
          `Album with ID ${patchTrackDto.album} not found`,
        );
      } else if (album.type !== 'album') {
        throw new NotAcceptableException(
          `Playlist must be type of album, but it's not. Id: ${patchTrackDto.album}`,
        );
      }
    }

    let processedImage;
    if (thumbnail) {
      processedImage = await this.fileService.processImage(
        thumbnail,
        FileType.THUMBNAIL,
      );
    }
    let processedAudio;
    if (audio) {
      processedAudio = await this.fileService.processAudio(audio);
    }

    const patchedTrackData = {
      ...patchTrackDto,
      thumbnail: processedImage
        ? processedImage.dynamicPath
        : existingTrack.thumbnail,
      audio: processedAudio ? processedAudio.dynamicPath : existingTrack.audio,
      duration: processedAudio
        ? processedAudio.metadata.duration
        : existingTrack.duration,
      bitrate: processedAudio
        ? processedAudio.metadata.bitrate
        : existingTrack.bitrate,
      format: processedAudio
        ? processedAudio.metadata.format
        : existingTrack.format,
    };

    const patchedTrack = await this.trackModel.findByIdAndUpdate(
      trackId,
      { $set: patchedTrackData },
      { new: true },
    );

    if (
      thumbnail &&
      existingTrack.thumbnail &&
      existingTrack.thumbnail !== processedImage.dynamicPath
    ) {
      await this.fileService.deleteFile(existingTrack.thumbnail);
    }
    if (
      audio &&
      existingTrack.audio &&
      existingTrack.audio !== processedAudio.dynamicPath
    ) {
      await this.fileService.deleteFile(existingTrack.audio);
    }

    return patchedTrack;
  }

  async listen(trackId: mongoose.Types.ObjectId): Promise<void> {
    const track = await this.trackModel.findById(trackId).exec();

    if (!track) {
      throw new Error('Track not found');
    }
    track.listens += 1;
    await track.save();
  }

  async search(
    query: string,
  ): Promise<{ tracks: Track[]; playlists: Playlist[]; artists: Artist[] }> {
    const sanitizedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const searchRegex = new RegExp(sanitizedQuery, 'i');

    try {
      const trackArtists = await this.artistModel
        .find({
          name: { $regex: searchRegex },
        })
        .select('_id')
        .exec();

      const albums = await this.playlistModel
        .find({
          title: { $regex: searchRegex },
        })
        .select('_id')
        .exec();

      // Searching for tracks using the artist and album IDs
      const tracks = await this.trackModel
        .find({
          $or: [
            { title: { $regex: searchRegex } },
            { artist: { $in: trackArtists.map((a) => a._id) } },
            { album: { $in: albums.map((a) => a._id) } },
          ],
        })
        .populate('artist')
        .populate('album')
        .limit(5)
        .sort({ listens: -1 })
        .exec();

      // Playlists/albums search
      const playlists = await this.playlistModel
        .find({
          title: { $regex: searchRegex },
        })
        .populate('artist')
        .limit(3)
        .exec();

      // Artists search
      const artists = await this.artistModel
        .find({
          name: { $regex: searchRegex },
        })
        .limit(3)
        .exec();

      return { tracks, playlists, artists };
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  }

  async deleteTrack(trackId: mongoose.Types.ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(trackId).exec();

    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    await this.fileService.deleteFile(track.audio);
    await this.fileService.deleteFile(track.thumbnail);
    return this.trackModel.findByIdAndDelete(trackId);
  }

  async deleteManyTracks(tracksIds: string[]): Promise<void> {
    const tracks = await this.trackModel
      .find({ _id: { $in: tracksIds } })
      .exec();

    await Promise.all(
      tracks.map(async (track) => {
        await this.fileService.deleteFile(track.audio);
        await this.fileService.deleteFile(track.thumbnail);
      }),
    );

    await this.trackModel.deleteMany({ _id: { $in: tracksIds } }).exec();
  }

  async deleteAllTracks(): Promise<void> {
    const tracks = await this.trackModel.find().exec();

    await Promise.all(
      tracks.map(async (track) => {
        await this.fileService.deleteFile(track.audio);
        await this.fileService.deleteFile(track.thumbnail);
      }),
    );

    await this.trackModel.deleteMany({}).exec();
  }
}
