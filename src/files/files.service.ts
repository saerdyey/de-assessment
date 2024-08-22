import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';

@Injectable()
export class FilesService {
  private readonly dataDir = path.join(__dirname, '..', 'data');

  constructor() {
    // Ensure the data directory exists
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir);
    }
  }

  async saveResponseToFile(
    fileName: string,
    data: CreatePostDto[],
  ): Promise<void> {
    const filePath = path.join(this.dataDir, fileName);

    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }

  getSavedData(): string {
    const filePath = path.join(this.dataDir, 'posts.json');
    console.log({filePath})

    if (!fs.existsSync(filePath)) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return fs.readFileSync(filePath, 'utf8');
  }
}
