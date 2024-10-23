import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommentService } from "./comment.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Comment } from "./comment.schema";

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("ADMIN", "USER")
  @Post('')
  @UseInterceptors(FileInterceptor(''))
  createComment(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentService.createComment(createCommentDto);
  }
}
