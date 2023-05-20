import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const { password, username } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { username },
      select: { username: true, password: true, id: true },
    });

    if (!user || !bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException();

    const userData = { username: user.username, sub: user.id };

    return {
      ...userData,
      access_token: await this.jwtService.signAsync(userData, {
        expiresIn: this.configService.get('jwtExpirationTime'),
      }),
    };
  }
}
