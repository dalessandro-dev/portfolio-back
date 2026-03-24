import { Module } from '@nestjs/common';
import { StackController } from './Stack.controller';
import { CreateStackUseCase } from 'src/modules/stack/useCases/createStackUseCase/CreateStackUseCase';
import { DeleteStackUseCase } from 'src/modules/stack/useCases/deleteStackUseCase/DeleteStackUseCase';
import { GetStackUseCase } from 'src/modules/stack/useCases/getStackUseCase/GetStackUseCase';
import { GetManyStackUseCase } from 'src/modules/stack/useCases/getManyStackUseCase/GetManyStackUseCase';
import { UpdateStackUseCase } from 'src/modules/stack/useCases/updateStackUseCase/UpdateStackUseCase';
import { DatabaseModule } from 'src/infra/database/Database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [StackController],
  providers: [
    CreateStackUseCase,
    DeleteStackUseCase,
    GetStackUseCase,
    GetManyStackUseCase,
    UpdateStackUseCase,
  ],
})
export class StackModule {}
