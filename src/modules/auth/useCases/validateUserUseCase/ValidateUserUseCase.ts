import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { AbstractUserRepository } from 'src/modules/user/repository/AbstractUserRepository';

interface ValidationUserRequest {
  email: string;
  password: string;
}

@Injectable()
export class ValidateUserUseCase {
  constructor(private userRepository: AbstractUserRepository) {}

  async execute({ email, password }: ValidationUserRequest) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new HttpException(
        'E-mail ou senha incorreto(s)',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordMatched = await compare(password, user.password);

    if (!isPasswordMatched) {
      throw new HttpException(
        'E-mail ou senha incorreto(s)',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }
}
