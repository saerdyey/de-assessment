import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

    const data = lastValueFrom(
      this.httpService.get(apiUrl).pipe(map((res) => res.data))
    );

    if(!data){
      throw new HttpException('Forbidden', HttpStatus.NO_CONTENT);
    }
    
    return data
  }

  async extractData() {
    const data: CreatePostDto[] = await this.findAll();

    const transformed = data.map((element: CreatePostDto) => ({
      ...element,
      createdAt: Date.now(),
    }));

    if (transformed) {
      this.fileService.saveResponseToFile('posts.json', transformed).catch(error => {
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      })
    }

    return {message: 'success'}
  }

  
}
