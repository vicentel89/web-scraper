import { Controller, Get, Param } from '@nestjs/common';
import { WebPagesService } from './web-pages.service';
import { WebPage } from './entities';

@Controller('web-pages')
export class WebPagesController {
  constructor(private readonly webPagesService: WebPagesService) {}

  @Get()
  async listWebPages() {
    const webPages = await this.webPagesService.list();
    return webPages;
  }

  @Get(':id')
  async getWebPageDetails(@Param('id') id: number): Promise<WebPage> {
    const webPage = await this.webPagesService.getById(id);
    return webPage;
  }
}
