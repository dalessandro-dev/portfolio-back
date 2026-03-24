import { Project } from '../entities/Project';
import { Stack } from 'src/modules/stack/entities/Stack';

export abstract class AbstractProjectRepository {
  abstract create(project: Project): Promise<void>;
  abstract update(project: Project): Promise<void>;
  abstract delete(id: number): Promise<void>;
  abstract get(
    id: number,
  ): Promise<{ project: Project; stacks: Stack[] } | null>;
  abstract getMany(
    page: number,
    perPage: number,
    query?: string,
    stacksId?: number[],
  ): Promise<{
    data: { project: Project; stacks: Stack[] }[];
    meta: { hasMore: boolean; lastPage: number; total: number };
  }>;
}
