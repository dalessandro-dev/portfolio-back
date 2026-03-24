import { PrismaService } from './prisma/prisma.service';
import { Module } from '@nestjs/common';
import { PrismaUserRepository } from './prisma/repositories/PrismaUserRepository';
import { PrismaProjectRepository } from './prisma/repositories/PrismaProjectRepository';
import { PrismaStackRepository } from './prisma/repositories/PrismaStackRepository';
import { AbstractUserRepository } from 'src/modules/user/repository/AbstractUserRepository';
import { AbstractProjectRepository } from 'src/modules/project/repositories/AbstractProjectRepository';
import { AbstractStackRepository } from 'src/modules/stack/repositories/AbstractStackRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: AbstractProjectRepository,
      useClass: PrismaProjectRepository,
    },
    {
      provide: AbstractStackRepository,
      useClass: PrismaStackRepository,
    },
    {
      provide: AbstractUserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [
    AbstractUserRepository,
    AbstractStackRepository,
    AbstractProjectRepository,
  ],
})
export class DatabaseModule {}
