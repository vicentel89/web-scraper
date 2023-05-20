import { Body, Controller, Post } from '@nestjs/common';
import { ScrapeService } from './scrape.service';
import { ScrapePageDto } from './dto/scrape-page.dto';

@Controller('scrape')
export class ScrapeController {
  constructor(private readonly scrapeService: ScrapeService) {}

  @Post('')
  createUser(@Body() body: ScrapePageDto) {
    return this.scrapeService.scrapeUrl(body.url);
  }
}
