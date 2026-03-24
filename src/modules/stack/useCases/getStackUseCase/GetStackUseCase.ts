import { AbstractStackRepository } from '../../repositories/AbstractStackRepository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class GetStackUseCase {
  constructor(private repo: AbstractStackRepository) {}

  async execute(id: number) {
    const project = await this.repo.get(id);

    if (!project) {
      throw new HttpException('Projeto não encontrado', HttpStatus.NOT_FOUND);
    }

    return project;
  }
}
