import { Module } from "@nestjs/common";
import { TrackController } from "./track.controller";
import { TrackService } from "./track.service";
import { MongooseModule } from "@nestjs/mongoose";
import { FileService } from "../file/file.service";
import { Track, TrackSchema } from "./track.schema";
import { Comment, CommentSchema } from "../comment/comment.schema";
import { Playlist, PlaylistSchema } from "../playlist/playlist.schema";
import { Artist, ArtistSchema } from "../artist/artist.schema";
import { User, UserSchema } from "../user/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Track.name, schema: TrackSchema},
      {name: Playlist.name, schema: PlaylistSchema},
      {name: Artist.name, schema: ArtistSchema},
      {name: Comment.name, schema: CommentSchema},
      {name: User.name, schema: UserSchema},
    ]),
  ],
  controllers: [TrackController],
  providers: [TrackService, FileService],
})
export class TrackModule {}