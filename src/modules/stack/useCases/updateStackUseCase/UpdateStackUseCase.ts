import { AbstractStackRepository } from '../../repositories/AbstractStackRepository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

interface UpdateStackRequest {
  name?: string;
}

@Injectable()
export class UpdateStackUseCase {
  constructor(private repo: AbstractStackRepository) {}

  async execute({ name }: UpdateStackRequest, id: number) {
    const project = await this.repo.get(id);

    if (!project) {
      throw new HttpException('Stack não encontrada', HttpStatus.NOT_FOUND);
    }

    if (name) {
      project.name = name;
    }

    await this.repo.update(project);

    return project;
  }
}
