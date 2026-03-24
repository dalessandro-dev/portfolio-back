import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/entities/User';
import { JwtService } from '@nestjs/jwt';

interface SignInRequest {
  user: User;
}

interface UserPayload {
  sub: number;
  email: string;
  name: string;
}

@Injectable()
export class SignInUseCase {
  constructor(private jwtService: JwtService) {}

  execute({ user }: SignInRequest) {
    const payload: UserPayload = {
      sub: user.id!,
      name: user.name,
      email: user.email,
    };

    const jwtToken = this.jwtService.sign(payload);

    return jwtToken;
  }
}
