import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { FileModule } from "./file/file.module";
import { PlaylistModule } from "./playlist/playlist.module";
import { TrackModule } from "./track/track.module";
import { ArtistModule } from "./artist/artist.module";
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get<string>('DB_USER')}:${configService.get<string>('DB_PASSWORD')}@${configService.get<string>('DB_CLUSTER')}.mongodb.net/?retryWrites=true&w=majority&appName=${configService.get<string>('DB_APP_NAME')}`,
      }),
    }),
    ConfigModule.forRoot({isGlobal: true}),
    TrackModule,
    FileModule,
    UserModule,
    AuthModule,
    PlaylistModule,
    ArtistModule,
    CommentModule
  ],
})
export class AppModule {}
