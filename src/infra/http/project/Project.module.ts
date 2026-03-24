import { Module } from '@nestjs/common';
import { ProjectController } from './Project.controller';
import { CreateProjectUseCase } from 'src/modules/project/useCases/createProjectUseCase/CreateProjectUseCase';
import { DeleteProjectUseCase } from 'src/modules/project/useCases/deleteProjectUseCase/DeleteProjectUseCase';
import { GetProjectUseCase } from 'src/modules/project/useCases/getProjectUseCse/GetProjectUseCase';
import { GetManyProjectUseCase } from 'src/modules/project/useCases/getManyProjectUseCase/GetManyProjectUseCase';
import { UpdateProjectUseCase } from 'src/modules/project/useCases/updateProjectUseCase/UpdateProjectUseCase';
import { DatabaseModule } from 'src/infra/database/Database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProjectController],
  providers: [
    CreateProjectUseCase,
    DeleteProjectUseCase,
    GetProjectUseCase,
    GetManyProjectUseCase,
    UpdateProjectUseCase,
  ],
})
export class ProjectModule {}
