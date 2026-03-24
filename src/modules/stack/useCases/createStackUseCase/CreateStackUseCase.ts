import { Injectable } from '@nestjs/common';
import { Stack } from '../../entities/Stack';
import { AbstractStackRepository } from '../../repositories/AbstractStackRepository';

interface CreateStackRequest {
  name: string;
}

@Injectable()
export class CreateStackUseCase {
  constructor(private repo: AbstractStackRepository) {}

  async execute({ name }: CreateStackRequest) {
    const stack = new Stack({ name, projectsId: [] });

    await this.repo.create(stack);

    return stack;
  }
}
