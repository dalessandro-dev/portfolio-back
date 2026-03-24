import { Stack } from 'src/modules/stack/entities/Stack';

export abstract class AbstractStackRepository {
  abstract create(stack: Stack): Promise<void>;
  abstract update(stack: Stack): Promise<void>;
  abstract delete(id: number): Promise<void>;
  abstract get(id: number): Promise<Stack | null>;
  abstract getMany(page: number, perPage: number): Promise<Stack[]>;
}
