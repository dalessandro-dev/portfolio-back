import { AbstractProjectRepository } from '../../repositories/AbstractProjectRepository';
import { Project } from '../../entities/Project';
import { Injectable } from '@nestjs/common';

interface CreateProjectRequest {
  title: string;
  userId: number;
  description: string;
  stacksId: number[];
  coverUrl: string;
  videoUrl: string;
  githubUrl: string;
  projectUrl: string;
}

@Injectable()
export class CreateProjectUseCase {
  constructor(private repo: AbstractProjectRepository) {}

  async execute(projectData: CreateProjectRequest) {
    const project = new Project(projectData);

    await this.repo.create(project);

    return project;
  }
}
