import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth/auth.module";
import { Artist, ArtistSchema } from "./artist.schema";
import { FileService } from "../file/file.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Artist.name, schema: ArtistSchema},
    ]),
    AuthModule
  ],
  controllers: [ArtistController],
  providers: [ArtistService, FileService],
})
export class ArtistModule {}
