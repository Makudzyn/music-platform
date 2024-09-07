import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from "../user.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { User } from "../user.schema";
import { CreateUserDto } from "../createUser.dto";

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
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(createUserDto.password, 5);
    return this.userService.createUser(createUserDto, passwordHash);
  }
}