import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AbstractProjectRepository } from '../../repositories/AbstractProjectRepository';

@Injectable()
export class DeleteProjectUseCase {
  constructor(private repo: AbstractProjectRepository) {}

  async execute(id: number) {
    const project = await this.repo.get(id);

    if (!project) {
      throw new HttpException('Projeto não encontrado', HttpStatus.NOT_FOUND);
    }

    await this.repo.delete(id);
  }
}
