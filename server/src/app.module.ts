import { Module } from '@nestjs/common';
import { TrackModule } from "./track/track.module";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:adminzxc@coolcluster.f4aak3h.mongodb.net/?retryWrites=true&w=majority&appName=CoolCluster'),
    TrackModule
  ],
})
export class AppModule {}
