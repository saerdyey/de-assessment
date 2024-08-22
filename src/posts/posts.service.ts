import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { HttpService } from '@nestjs/axios';
import { elementAt, find, lastValueFrom, map } from 'rxjs';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly httpService: HttpService,
    private fileService: FilesService,
  ) {}

  async findAll() {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

    return lastValueFrom(
      this.httpService.get(apiUrl).pipe(map((res) => res.data)),
    );
  }

  async extractData() {
    const data = await this.findAll();

    const transformed = data.map((element: CreatePostDto) => ({
      ...element,
      createdAt: Date.now(),
    }));

    if (transformed) {
      this.fileService.saveResponseToFile('posts', transformed).then(() => {});
    }

    return {message: 'success'}
  }
}
