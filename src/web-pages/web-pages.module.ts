import { Module } from '@nestjs/common';
import { WebPagesService } from './web-pages.service';
import { WebPagesController } from './web-pages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebPage } from './entities';
import { LinksModule } from 'src/links/links.module';
import { AuthModule } from 'src/auth';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([WebPage]), LinksModule],
  controllers: [WebPagesController],
  providers: [WebPagesService],
  exports: [WebPagesService],
})
export class WebPagesModule {}
