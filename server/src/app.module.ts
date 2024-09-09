import { Module } from '@nestjs/common';
import { TrackModule } from "./track/track.module";
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from "./file/file.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path';
import { UserModule } from "./user/user.module";
import { PlaylistModule } from "./playlist/playlist.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";

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
  ],
})
export class AppModule {}
