import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  async downloadAndSaveImage64(url: string): Promise<any> {
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(response.data);

      const base64Image = imageBuffer.toString('base64');

      return base64Image;
    } catch (error) {
      throw new HttpException(
        'Falha ao baixar a imagem',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async downloadAndSaveImageLocal(
    url: string,
    destinationPath: string,
  ): Promise<any> {
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      if (response.status === 200) {
        const imageBuffer = Buffer.from(response.data);
        const contentType = response.headers['content-type'];
        const extension = contentType.split('/')[1];
        const fullPath = path.join(destinationPath, `${uuidv4()}.${extension}`);
        fs.writeFileSync(fullPath, imageBuffer);
      } else {
        throw new HttpException(
          'Falha ao baixar a imagem1',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Falha ao baixar a imagem',

        error,
      );
    }
  }
}
