import { Module } from "@nestjs/common";
import { TrackController } from "./track.controller";
import { TrackService } from "./track.service";
import { MongooseModule } from "@nestjs/mongoose";
import { FileService } from "../file/file.service";
import { Track, TrackSchema } from "./schemas/track.schema";
import { Comment, CommentSchema } from "./schemas/comment.schema";
import { Playlist, PlaylistSchema } from "../playlist/playlist.schema";
import { Artist, ArtistSchema } from "../artist/artist.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Track.name, schema: TrackSchema},
      {name: Playlist.name, schema: PlaylistSchema},
      {name: Artist.name, schema: ArtistSchema},
      {name: Comment.name, schema: CommentSchema},
    ]),
  ],
  controllers: [TrackController],
  providers: [TrackService, FileService],
})
export class TrackModule {}