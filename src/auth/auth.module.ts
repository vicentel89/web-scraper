import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get('jwtSecret'),
        signOptions: { expiresIn: config.get('jwtExpirationTime') },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
