import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ScrapeModule } from './scrape/scrape.module';
import { WebPagesModule } from './web-pages/web-pages.module';
import { LinksModule } from './links/links.module';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
    UsersModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
