import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './comment.schema';
import { Track, TrackDocument } from '../track/track.schema';
import { User, UserDocument } from '../user/user.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(createCommentDto.track).exec();

    if (!track) {
      throw new NotFoundException(
        `Track with ID ${createCommentDto.track} not found`,
      );
    }

    const user = await this.userModel.findById(createCommentDto.user).exec();
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createCommentDto.user} not found`,
      );
    }

    const comment = await this.commentModel.create(createCommentDto);
    track.comments.push(comment._id);
    await track.save();
    return comment;
  }
}
