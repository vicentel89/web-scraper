import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ScrapeModule } from './scrape/scrape.module';
import { WebPagesModule } from './web-pages/web-pages.module';
import { LinksModule } from './links/links.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) =>
        config.get<TypeOrmModuleOptions>('database'),
      inject: [ConfigService],
    }),
    AuthModule,
    ScrapeModule,
    WebPagesModule,
    LinksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
