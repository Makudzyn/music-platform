import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PlaylistService } from './playlist.service';

@Injectable()
export class PlaylistOwnerGuard implements CanActivate {
  constructor(
    private readonly playlistService: PlaylistService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const playlistId = request.params.playlistId;

    // Получаем плейлист и проверяем его владельца
    const playlist = await this.playlistService.findPlaylistById(playlistId);
    if (!playlist.owner.equals(user.userId)) {
      throw new ForbiddenException('You are not the owner of this playlist');
    }
    return true;
  }
}
