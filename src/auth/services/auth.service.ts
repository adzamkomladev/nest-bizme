import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { User } from '../entities/user.entity';

import { UserRepository } from '../repositories/user.repository';

import { AuthCredentialsDto } from '../dtos/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    try {
      return await this.userRepository.signUp(authCredentialsDto);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const user = await this.userRepository.authenticateUser(authCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    return user;
  }
}
