import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { FileService, FileType } from '../file/file.service';
import { PatchUserDto } from './dto/patch-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private fileService: FileService,
  ) {}

  // Создание пользователя
  async createUser(
    createUserDto: CreateUserDto,
    passwordHash: string,
  ): Promise<User> {
    const verificationToken = uuidv4();

    const newUser = new this.userModel({
      ...createUserDto,
      passwordHash,
      role: 'USER',
      isVerified: false, // New user has not confirmed email yet
      verificationToken,
    });
    return newUser.save();
  }

  // Retrieving a user by email
  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email });
  }

  async findByEmailToken(token: string): Promise<User | null> {
    return this.userModel.findOne({ verificationToken: token }).exec();
  }

  async updateEmailConfirmation(user: User): Promise<User> {
    const { email, isVerified, verificationToken } = user;

    const existingUser = await this.userModel.findOne({ email }).exec();

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    // Updating user fields
    existingUser.isVerified = isVerified;
    existingUser.verificationToken = verificationToken;

    return existingUser.save();
  }

  async getUserById(userId: mongoose.Types.ObjectId): Promise<User> {
    const existingUser = await this.userModel
      .findById(userId)
      .select('_id username avatar email createdAt role playlists bio');
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return existingUser;
  }

  async updateUser(
    userId: mongoose.Types.ObjectId,
    patchUserDto: PatchUserDto,
    avatar: Express.Multer.File,
  ): Promise<User> {
    const existingUser = await this.userModel.findById(userId).exec();

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    let processedAvatar;
    if (avatar) {
      processedAvatar = await this.fileService.processImage(
        avatar,
        FileType.AVATAR,
        { width: 200, height: 200 },
      );
    }

    const patchedUserData = {
      username: patchUserDto.username || existingUser.username,
      email: patchUserDto.email || existingUser.email,
      bio: patchUserDto.bio || existingUser.bio,
      avatar: processedAvatar
        ? processedAvatar.dynamicPath
        : existingUser.avatar,
    };

    if (avatar && existingUser.avatar) {
      if (existingUser.avatar !== processedAvatar.dynamicPath) {
        await this.fileService.deleteFile(existingUser.avatar);
      }
    }

    return this.userModel.findByIdAndUpdate(
      userId,
      { $set: patchedUserData },
      { new: true },
    );
  }

  async deleteUser(userId: mongoose.Types.ObjectId): Promise<User> {
    return this.userModel.findByIdAndDelete(userId).exec();
  }
}
