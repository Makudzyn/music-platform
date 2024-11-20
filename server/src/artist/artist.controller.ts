import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import mongoose from 'mongoose';
import { Artist } from './artist.schema';

@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('/create-artist')
  @UseInterceptors(FileInterceptor(''))
  createArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }

  @Get('/')
  getAllArtists(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<Artist[]> {
    return this.artistService.getAllArtists(limit);
  }

  @Get('/:artistId')
  getOneArtist(@Param('artistId') artistId: mongoose.Types.ObjectId) {
    return this.artistService.getArtistById(artistId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch('/patch-artist/:artistId')
  @UseInterceptors(FileInterceptor('artistImage'))
  patchArtist(
    @Param('artistId') artistId: mongoose.Types.ObjectId,
    @Body() updateArtistDto: UpdateArtistDto,
    @UploadedFile() artistImage: Express.Multer.File,
  ) {
    return this.artistService.patchArtist(
      artistId,
      updateArtistDto,
      artistImage,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete('/:artistId')
  deleteArtist(@Param('artistId') artistId: mongoose.Types.ObjectId) {
    return this.artistService.deleteArtist(artistId);
  }
}
