import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './infra/http/auth/guards/JwtGuard.guard';
import { ProjectModule } from './infra/http/project/Project.module';
import { StackModule } from './infra/http/stack/Stack.module';
import { AuthModule } from './infra/http/auth/Auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ProjectModule,
    StackModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
