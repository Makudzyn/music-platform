import {
  Controller,
  Get,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import mongoose from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { PatchUserDto } from './dto/patch-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getMe(@Req() req: any) {
    return req.user; // User from JWT-token
  }

  @Get(':userId')
  getUserById(@Param('userId') userId: mongoose.Types.ObjectId) {
    return this.userService.getUserById(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('USER', 'ADMIN')
  @Patch(':userId')
  @UseInterceptors(FileInterceptor('avatar'))
  updateUser(
    @Param('userId') userId: mongoose.Types.ObjectId,
    @Body() patchUserDto: PatchUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return this.userService.updateUser(userId, patchUserDto, avatar);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':userId')
  deleteUser(@Param('userId') userId: mongoose.Types.ObjectId) {
    return this.userService.deleteUser(userId);
  }
}
