import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from "./create-user.dto";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Создание пользователя
  async createUser(createUserDto: CreateUserDto, passwordHash: string): Promise<User> {
    const verificationToken = uuidv4();

    const newUser = new this.userModel({
      ...createUserDto,
      passwordHash,
      role: "USER",
      isVerified: false, // Новый пользователь ещё не подтвердил email
      verificationToken
    });
    return newUser.save();
  }


  // Получение пользователя по email
  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email });
  }

  async findByEmailToken(token: string): Promise<User | null> {
    return this.userModel.findOne({ verificationToken: token }).exec();
  }

  async updateEmailConfirmation(user: User): Promise<User> {
    const {email, isVerified, verificationToken} = user;

    const existingUser = await this.userModel.findOne({ email }).exec();

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    // Обновляем поля пользователя
    existingUser.isVerified = isVerified;
    existingUser.verificationToken = verificationToken;

    return existingUser.save();
  }

  // Получение пользователя по id
  async findById(id: mongoose.Types.ObjectId): Promise<User | undefined> {
    return this.userModel.findById(id).exec();
  }

  // Обновление данных пользователя
  async updateUser(id: mongoose.Types.ObjectId, updateData: Partial<User>): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  // Удаление пользователя
  async deleteUser(id: mongoose.Types.ObjectId): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
