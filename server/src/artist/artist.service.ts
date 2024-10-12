import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectModel } from "@nestjs/mongoose";
import { Artist, ArtistDocument } from "./artist.schema";
import mongoose, { Model } from "mongoose";
import { FileService, FileType } from "../file/file.service";

@Injectable()
export class ArtistService {
  constructor(
    @InjectModel(Artist.name) private readonly artistModel: Model<ArtistDocument>,
    private fileService: FileService
  ) {}

  private async findArtistById(artistId: mongoose.Types.ObjectId): Promise<ArtistDocument> {
    const artist = await this.artistModel.findById(artistId).exec();
    if (!artist) {
      throw new NotFoundException(`Playlist with ID ${artistId} not found`);
    }
    return artist;
  }

  async createArtist(createArtistDto: CreateArtistDto) {
    return this.artistModel.create({...createArtistDto});
  }

  async getAllArtists(limit: number): Promise<Artist[]> {
    return this.artistModel
    .find()
    .limit(limit)
    .populate('albums', '_id title')
    .exec();
  }

  async getArtistById(artistId: mongoose.Types.ObjectId) {
    return this.findArtistById(artistId);
  }

  async patchArtist(artistId: mongoose.Types.ObjectId, updateArtistDto: UpdateArtistDto, artistImage: Express.Multer.File) {
    const existingArtist = await this.findArtistById(artistId);
    let processedImage;
    if (artistImage) {
      processedImage = await this.fileService.processImage(artistImage, FileType.ARTIST_IMAGE);
    }

    const patchedArtistData = {
      name: updateArtistDto.name || existingArtist.name,
      aboutInfo: updateArtistDto.aboutInfo || existingArtist.aboutInfo,
      albums: updateArtistDto.albums || existingArtist.albums,
      artistImage: processedImage ? processedImage.dynamicPath : existingArtist.artistImage
    }

    if (artistImage && existingArtist.artistImage) {
      if (existingArtist.artistImage !== processedImage.dynamicPath) {
        this.fileService.deleteFile(existingArtist.artistImage);
      }
    }
    return this.artistModel.findByIdAndUpdate(artistId, {$set: patchedArtistData}, {new: true});
  }

  async deleteArtist(artistId: mongoose.Types.ObjectId) {
    const existingArtist = await this.findArtistById(artistId);
    if (existingArtist.artistImage) {
      this.fileService.deleteFile(existingArtist.artistImage);
    }
    return this.artistModel.findByIdAndDelete(artistId);
  }
}