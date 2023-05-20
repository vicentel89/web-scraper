import { Module } from '@nestjs/common';
import { ScrapeService } from './scrape.service';
import { ScrapeController } from './scrape.controller';
import { WebPagesModule } from 'src/web-pages/web-pages.module';
import { AuthModule } from 'src/auth';

@Module({
  imports: [AuthModule, WebPagesModule],
  controllers: [ScrapeController],
  providers: [ScrapeService],
  exports: [ScrapeService],
})
export class ScrapeModule {}
