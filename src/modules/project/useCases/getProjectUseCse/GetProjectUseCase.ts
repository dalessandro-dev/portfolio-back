import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AbstractProjectRepository } from '../../repositories/AbstractProjectRepository';

@Injectable()
export class GetProjectUseCase {
  constructor(private repo: AbstractProjectRepository) {}

  async execute(id: number) {
    const project = await this.repo.get(id);

    if (!project) {
      throw new HttpException('Projeto não encontrado', HttpStatus.NOT_FOUND);
    }

    return project;
  }
}
