import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { AuthCredentialsDto } from '../dtos/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }
}
