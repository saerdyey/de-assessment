import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { FilesService } from './files/files.service';

@Module({
  imports: [PostsModule],
  controllers: [AppController],
  providers: [AppService, FilesService],
})
export class AppModule {}
