import { Controller, Get } from '@nestjs/common';
import { WebPagesService } from './web-pages.service';

@Controller('web-pages')
export class WebPagesController {
  constructor(private readonly webPagesService: WebPagesService) {}

  @Get()
  async listWebPages() {
    const webPages = await this.webPagesService.list();
    return webPages;
  }
}
