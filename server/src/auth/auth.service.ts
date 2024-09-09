import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from "../user/user.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/user.schema";
import { CreateUserDto } from "../user/createUser.dto";

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
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const passwordHash = await bcrypt.hash(createUserDto.password, 5);
    return this.userService.createUser(createUserDto, passwordHash);
  }
}