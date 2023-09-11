import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('download64')
  @HttpCode(200)
  async downloadImageBase64(@Body() body: { url: string }): Promise<string> {
    const { url } = body;
    const output = await this.appService.downloadAndSaveImage64(url);
    return output;
  }

  @Post('downloadLocal')
  @HttpCode(200)
  async downloadImageLocal(@Body() body: { url: string }): Promise<string> {
    const { url } = body;
    const destinationPath = './imgs';

    const output = await this.appService.downloadAndSaveImageLocal(
      url,
      destinationPath,
    );
    return output;
  }
}
