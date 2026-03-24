import {
  Stack as StackRaw,
  ProjectsOnStacks as ProjectsOnStacksRaw,
} from '@prisma/client';
import { Stack } from 'src/modules/stack/entities/Stack';

export class PrismaStackMapper {
  static toPrisma(stack: Stack): StackRaw {
    return {
      name: stack.name,
      id: stack.id!,
    };
  }

  static toDomain(raw: StackRaw & { projects: ProjectsOnStacksRaw[] }): Stack {
    return new Stack(
      { name: raw.name, projectsId: raw.projects.map((p) => p.projectId) },
      raw.id,
    );
  }
}
