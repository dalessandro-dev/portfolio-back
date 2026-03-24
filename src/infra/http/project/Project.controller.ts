import {
  Body,
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Request,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateProjectUseCase } from 'src/modules/project/useCases/createProjectUseCase/CreateProjectUseCase';
import { AuthenticatedRequestModel } from '../auth/models/AuthenticatedRequest';
import { CreateProjectBody } from './dtos/CreateProjectBody';
import { ProjectViewModel } from './viewModels/ProjectViewModel';
import { UpdateProjectUseCase } from 'src/modules/project/useCases/updateProjectUseCase/UpdateProjectUseCase';
import { DeleteProjectUseCase } from 'src/modules/project/useCases/deleteProjectUseCase/DeleteProjectUseCase';
import { GetProjectUseCase } from 'src/modules/project/useCases/getProjectUseCse/GetProjectUseCase';
import { GetManyProjectUseCase } from 'src/modules/project/useCases/getManyProjectUseCase/GetManyProjectUseCase';
import { UpdateProjectBody } from './dtos/UpdateProjectBody';
import { GetManyProjectsQuery } from './dtos/GetManyProjectsQuery';
import { validate } from 'class-validator';
import { Public } from '../auth/decorators/isPublic.decorator';

@Controller('projects')
export class ProjectController {
  constructor(
    private createProjectUseCase: CreateProjectUseCase,
    private updateProjectUseCase: UpdateProjectUseCase,
    private deleteProjectUseCase: DeleteProjectUseCase,
    private getProjectUseCase: GetProjectUseCase,
    private getManyProjectUseCase: GetManyProjectUseCase,
  ) {}

  @Post()
  async createProject(
    @Request() request: AuthenticatedRequestModel,
    @Body() body: CreateProjectBody,
  ) {
    const bodyModel = new CreateProjectBody();

    bodyModel.title = body.title;
    bodyModel.description = body.description;
    bodyModel.githubUrl = body.githubUrl;
    bodyModel.projectUrl = body.projectUrl;
    bodyModel.coverUrl = body.coverUrl;
    bodyModel.videoUrl = body.videoUrl;
    bodyModel.stacksId = body.stacksId;

    const validations = await validate(bodyModel);

    if (validations.length) {
      throw new HttpException('Data incorrect', HttpStatus.BAD_REQUEST);
    }

    const proj = await this.createProjectUseCase.execute({
      title: body.title,
      userId: request.user.id,
      description: body.description,
      githubUrl: body.githubUrl,
      projectUrl: body.projectUrl,
      coverUrl: body.coverUrl,
      videoUrl: body.videoUrl,
      stacksId: body.stacksId,
    });

    return ProjectViewModel.toHttp({ project: proj });
  }

  @Put(':id')
  async updateProject(
    @Body()
    {
      title,
      description,
      githubUrl,
      coverUrl,
      videoUrl,
      stacksId,
      projectUrl,
    }: UpdateProjectBody,
    @Param('id') projId: string,
  ) {
    description = description ?? null;

    const bodyModel = new UpdateProjectBody();

    bodyModel.title = title;
    bodyModel.description = description;
    bodyModel.githubUrl = githubUrl;
    bodyModel.projectUrl = projectUrl;
    bodyModel.coverUrl = coverUrl;
    bodyModel.videoUrl = videoUrl;
    bodyModel.stacksId = stacksId;

    const validations = await validate(bodyModel);

    if (validations.length) {
      throw new HttpException('Data incorrect', HttpStatus.BAD_REQUEST);
    }

    const proj = await this.updateProjectUseCase.execute(Number(projId), {
      title,
      description,
      githubUrl,
      projectUrl,
      coverUrl,
      videoUrl,
      stacksId,
    });

    return ProjectViewModel.toHttp({ project: proj });
  }

  @Delete(':id')
  async deleteProject(@Param('id') projectId: string) {
    await this.deleteProjectUseCase.execute(Number(projectId));
  }

  @Public()
  @Get(':id')
  async getProject(@Param('id') projId: string) {
    const proj = await this.getProjectUseCase.execute(Number(projId));

    return ProjectViewModel.toHttp(proj);
  }

  @Public()
  @Get()
  async getManyProject(@Query() queryDto: GetManyProjectsQuery) {
    const projectsData = await this.getManyProjectUseCase.execute({
      page: queryDto.page,
      perPage: queryDto.perPage,
      query: queryDto.query,
      stacksId: queryDto.stacksId,
    });

    const { data, meta } = projectsData;

    return {
      page: queryDto.page,
      perPage: queryDto.perPage,
      data: data.map((proj) => ProjectViewModel.toHttp(proj)),
      meta,
    };
  }
}
