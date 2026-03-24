import { Injectable } from '@nestjs/common';
import { AbstractStackRepository } from '../../repositories/AbstractStackRepository';

interface GetManyStackRequest {
  page?: number;
  perPage?: number;
}

@Injectable()
export class GetManyStackUseCase {
  constructor(private repo: AbstractStackRepository) {}

  async execute({ page = 1, perPage = 20 }: GetManyStackRequest) {
    const projects = await this.repo.getMany(page, perPage);

    return projects;
  }
}
