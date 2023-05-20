import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ScrapeService } from './scrape.service';
import { ScrapePageDto } from './dto/scrape-page.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('scrape')
export class ScrapeController {
  constructor(private readonly scrapeService: ScrapeService) {}

  @Post('')
  createUser(@Body() body: ScrapePageDto) {
    return this.scrapeService.scrapeUrl(body.url);
  }
}
