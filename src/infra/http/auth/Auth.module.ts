import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from './Auth.controller';
import { LocalStrategy } from 'src/modules/auth/strategies/localStrategy.strategy';
import { ValidateUserUseCase } from 'src/modules/auth/useCases/validateUserUseCase/ValidateUserUseCase';
import { UserModule } from '../user/User.module';
import { DatabaseModule } from 'src/infra/database/Database.module';
import { SignInDTOValidateMiddleware } from './middlewares/SignInDTOValidate';
import { SignInUseCase } from 'src/modules/auth/useCases/signInUserUseCase/SignInUserUseCase';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET as string,
        signOptions: { expiresIn: process.env.JWT_EXPIRE as any},
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy, ValidateUserUseCase, SignInUseCase],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SignInDTOValidateMiddleware).forRoutes('auth/signIn');
  }
}
