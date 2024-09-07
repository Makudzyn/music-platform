import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from "./user.schema";
import { CreateUserDto } from "./createUser.dto";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req: any) {
    return req.user; // Пользователь из JWT токена
  }

  @Post('create')
  createUser(createUserDto: CreateUserDto, passwordHash: string) {
    return this.userService.createUser(createUserDto, passwordHash);
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateData: Partial<User>
  ) {
    return this.userService.updateUser(id, updateData);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
