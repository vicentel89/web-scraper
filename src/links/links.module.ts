import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  providers: [LinksService],
  exports: [LinksService],
})
export class LinksModule {}
