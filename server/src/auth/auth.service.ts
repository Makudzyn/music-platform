import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from "../user/user.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/user.schema";
import { CreateUserDto } from "../user/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
    ) {}

  async validateUser(email: string, password: string): Promise<Omit<User, "passwordHash"> | null> {
    const user = await this.userService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.passwordHash)) {
      const { passwordHash, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }

  async login(user: any) {
    const { username, _id, role } = user._doc;
    const payload = { username, sub: _id, role };

    // Генерация access-токена с коротким сроком действия
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });

    // Генерация refresh-токена с более долгим сроком действия
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {accessToken, refreshToken};
  }

  async refreshAccessToken(refreshToken: string): Promise<{accessToken: string}> {
    try {
      const payload = this.jwtService.verify(refreshToken); // Верификация refresh-токена

      // Генерация нового access-токена
      const accessToken = this.jwtService.sign(
        { sub: payload.sub, role: payload.role },
        { expiresIn: '15m' }
      );

      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const passwordHash = await bcrypt.hash(createUserDto.password, 5);
    return this.userService.createUser(createUserDto, passwordHash);
  }
}