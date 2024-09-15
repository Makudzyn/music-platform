import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PlaylistController } from "./playlist.controller";
import { PlaylistService } from "./playlist.service";
import { Playlist, PlaylistSchema } from "./playlist.schema";
import { AuthModule } from "../auth/auth.module";
import { FileService } from "../file/file.service";
import { Track, TrackSchema } from "../track/schemas/track.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Playlist.name, schema: PlaylistSchema},
      { name: Track.name, schema: TrackSchema }
    ]),
    AuthModule
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService, FileService],
})
export class PlaylistModule {}