import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { WebPagesService } from './web-pages.service';
import { WebPage } from './entities';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { CurrentUserInterface } from 'src/users/interfaces/current-user.interface';

@UseGuards(AuthGuard)
@Controller('web-pages')
export class WebPagesController {
  constructor(private readonly webPagesService: WebPagesService) {}

  @Get()
  async listWebPages(@CurrentUser() user: CurrentUserInterface) {
    const webPages = await this.webPagesService.list(user);
    return webPages;
  }

  @Get(':id')
  async getWebPageDetails(@Param('id') id: number): Promise<WebPage> {
    const webPage = await this.webPagesService.getById(id);
    return webPage;
  }
}
