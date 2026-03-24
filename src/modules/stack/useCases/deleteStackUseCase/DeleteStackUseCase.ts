import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AbstractStackRepository } from '../../repositories/AbstractStackRepository';

@Injectable()
export class DeleteStackUseCase {
  constructor(private repo: AbstractStackRepository) {}

  async execute(id: number) {
    const project = await this.repo.get(id);

    if (!project) {
      throw new HttpException('Stack não encontrada', HttpStatus.NOT_FOUND);
    }

    await this.repo.delete(id);
  }
}
