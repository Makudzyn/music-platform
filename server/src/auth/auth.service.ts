import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from "../user/user.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/user.schema";
import { CreateUserDto } from "../user/create-user.dto";
import { MailService } from "./mail/mail.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
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
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1d' }); //Replace with 15m when done filling DB

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
    const newUser = await this.userService.createUser(createUserDto, passwordHash);

    // Отправляем письмо для подтверждения email
    await this.mailService.sendEmailConfirmation(newUser.email, newUser.verificationToken);

    return newUser;
  }

  async confirmEmail(token: string): Promise<User> {
    const user = await this.userService.findByEmailToken(token);

    if (!user) {
      throw new BadRequestException('Invalid or expired token');
    }

    // Обновляем статус пользователя
    user.isVerified = true;
    user.verificationToken = null;

    return this.userService.updateEmailConfirmation(user);
  }

}