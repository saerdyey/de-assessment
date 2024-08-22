import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { FilesService } from '../files/files.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly filesService: FilesService
  ) {}

  @Get()
  getData() {
    return this.filesService.getSavedData();
  }

  @Get('extract')
  extractData() {
    return this.postsService.extractData();
  }
}
