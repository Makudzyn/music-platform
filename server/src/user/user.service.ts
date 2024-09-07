import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "./createUser.dto";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Создание пользователя
  async createUser(createUserDto: CreateUserDto, passwordHash: string): Promise<User> {
    const newUser= new this.userModel({ ...CreateUserDto, passwordHash });
    return newUser.save();
  }

  // Получение пользователя по email
  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  // Получение пользователя по id
  async findById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id).exec();
  }

  // Обновление данных пользователя
  async updateUser(id: string, updateData: Partial<User>): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  // Удаление пользователя
  async deleteUser(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}