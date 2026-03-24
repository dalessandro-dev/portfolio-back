import {
  Controller,
  Post,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthRequestModel } from './models/AuthRequest';
import { SignInUseCase } from 'src/modules/auth/useCases/signInUserUseCase/SignInUserUseCase';
import { LocalAuthGuard } from './guards/LocalAuth.guard';
import { Public } from './decorators/isPublic.decorator';
import { AuthenticatedRequestModel } from './models/AuthenticatedRequest';

@Controller('auth')
export class AuthController {
  constructor(private signInUseCase: SignInUseCase) {}

  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  @Public()
  @UseGuards(LocalAuthGuard)
  signIn(@Request() request: AuthRequestModel) {
    const access_token = this.signInUseCase.execute({ user: request.user });

    return { access_token };
  }

  @Get('test')
  test(@Request() request: AuthenticatedRequestModel) {
    return request.user;
  }
}
