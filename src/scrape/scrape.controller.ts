import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ScrapeService } from './scrape.service';
import { ScrapePageDto } from './dto/scrape-page.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { CurrentUserInterface } from 'src/users/interfaces/current-user.interface';

@UseGuards(AuthGuard)
@Controller('scrape')
export class ScrapeController {
  constructor(private readonly scrapeService: ScrapeService) {}

  @Post('')
  createUser(
    @CurrentUser() user: CurrentUserInterface,
    @Body() body: ScrapePageDto,
  ) {
    return this.scrapeService.scrapeUrl(user, body.url);
  }
}
