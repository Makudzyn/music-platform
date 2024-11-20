import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Playlist, PlaylistDocument } from './playlist.schema';
import { Model } from 'mongoose';

@Injectable()
export class PlaylistOwnerGuard implements CanActivate {
  constructor(
    @InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const playlistId = request.params.playlistId;

    const playlist = await this.playlistModel.findById(playlistId).exec();
    if (!playlist) {
      throw new NotFoundException(`Playlist with ID ${playlistId} not found`);
    }
    if (!playlist.owner.equals(user.userId)) {
      throw new ForbiddenException('You are not the owner of this playlist');
    }
    return true;
  }
}
