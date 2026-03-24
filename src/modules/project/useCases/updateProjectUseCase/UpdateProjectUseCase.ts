import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AbstractProjectRepository } from '../../repositories/AbstractProjectRepository';

interface UpdateProjectRequest {
  title?: string;
  description?: string;
  stacksId?: number[];
  coverUrl?: string;
  videoUrl?: string;
  githubUrl?: string;
  projectUrl?: string;
}

@Injectable()
export class UpdateProjectUseCase {
  constructor(private repo: AbstractProjectRepository) {}

  async execute(
    id: number,
    {
      title,
      description,
      stacksId,
      coverUrl,
      videoUrl,
      githubUrl,
      projectUrl,
    }: UpdateProjectRequest,
  ) {
    const result = await this.repo.get(id);

    if (!result) {
      throw new HttpException('Projeto não encontrado', HttpStatus.NOT_FOUND);
    }

    const project = result.project;

    if (title) {
      project.title = title;
    }
    if (description) {
      project.description = description;
    }
    if (coverUrl) {
      project.coverUrl = coverUrl;
    }
    if (videoUrl) {
      project.videoUrl = videoUrl;
    }
    if (githubUrl) {
      project.githubUrl = githubUrl;
    }
    if (projectUrl) {
      project.projectUrl = projectUrl;
    }
    if (stacksId) {
      project.stacksId = stacksId;
    }

    await this.repo.update(project);

    return project;
  }
}
