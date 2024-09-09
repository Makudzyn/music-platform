import { Controller, Get, Body, Param, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from "./user.schema";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/roles.decorator";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(RolesGuard)
  @Roles('ADMIN')  // Только для пользователей с ролью ADMIN
  @Get('admin')
  getAdminData() {
    return 'Only admins can see this!';
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req: any) {
    return req.user; // Пользователь из JWT токена
  }


  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateData: Partial<User>
  ) {
    return this.userService.updateUser(id, updateData);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
