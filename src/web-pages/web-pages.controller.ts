import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { WebPagesService } from './web-pages.service';
import { WebPage } from './entities';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { CurrentUserInterface } from 'src/users/interfaces/current-user.interface';
import { PaginationDto } from './dto/pagination.dto';
import { Pagination } from 'nestjs-typeorm-paginate';

@UseGuards(AuthGuard)
@Controller('web-pages')
export class WebPagesController {
  constructor(private readonly webPagesService: WebPagesService) {}

  @Get()
  async listWebPages(
    @CurrentUser() user: CurrentUserInterface,
    @Query() query: PaginationDto,
  ): Promise<Pagination<WebPage>> {
    const webPages = await this.webPagesService.list(user, query);
    return webPages;
  }

  @Get(':id')
  async getWebPageDetails(@Param('id') id: number): Promise<WebPage> {
    const webPage = await this.webPagesService.getById(id);
    return webPage;
  }
}
