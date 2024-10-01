import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path';
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { FileModule } from "./file/file.module";
import { PlaylistModule } from "./playlist/playlist.module";
import { TrackModule } from "./track/track.module";
import { ArtistModule } from "./artist/artist.module";

@Module({
  imports: [
    ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
    MongooseModule.forRoot('mongodb+srv://admin:adminzxc@coolcluster.f4aak3h.mongodb.net/?retryWrites=true&w=majority&appName=CoolCluster'),
    ConfigModule.forRoot(),
    TrackModule,
    FileModule,
    UserModule,
    AuthModule,
    PlaylistModule,
    ArtistModule
  ],
})
export class AppModule {}
