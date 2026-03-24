import { Injectable } from '@nestjs/common';
import { AbstractProjectRepository } from '../../repositories/AbstractProjectRepository';

interface GetManyProjectRequest {
  query?: string;
  stacksId?: number[];
  perPage: number;
  page: number;
}

@Injectable()
export class GetManyProjectUseCase {
  constructor(private repo: AbstractProjectRepository) {}

  async execute({
    query,
    stacksId,
    perPage = 20,
    page = 1,
  }: GetManyProjectRequest) {
    const projects = await this.repo.getMany(page, perPage, query, stacksId);

    return projects;
  }
}
