import { EntityRepository, Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';

import { AuthCredentialsDto } from '../dtos/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { email, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const user = this.create();
    user.salt = salt;
    user.email = email;
    user.password = await UserRepository.hashPassword(password, salt);

    return await user.save();
  }

  async authenticateUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    const { email, password } = authCredentialsDto;

    const user = await this.findOne({ email });

    if (await user?.validatePassword(password)) {
      return user;
    }

    return null;
  }

  private static hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
