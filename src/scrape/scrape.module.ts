import { Module } from '@nestjs/common';
import { ScrapeService } from './scrape.service';
import { ScrapeController } from './scrape.controller';
import { WebPagesModule } from 'src/web-pages/web-pages.module';

@Module({
  imports: [WebPagesModule],
  controllers: [ScrapeController],
  providers: [ScrapeService],
  exports: [ScrapeService],
})
export class ScrapeModule {}
