import { Stack } from 'src/modules/stack/entities/Stack';

export class StackViewModel {
  static toHttp({ id, name, projectsId }: Stack) {
    return {
      id,
      name,
      projectsId,
    };
  }
}
