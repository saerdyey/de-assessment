import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { HttpModule } from '@nestjs/axios/dist/http.module';
import { FilesService } from 'src/files/files.service';

@Module({
  imports: [HttpModule],
  controllers: [PostsController],
  providers: [PostsService, FilesService]
})

export class PostsModule {}
