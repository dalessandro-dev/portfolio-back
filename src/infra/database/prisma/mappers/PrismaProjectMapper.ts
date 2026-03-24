import { Project } from 'src/modules/project/entities/Project';
import { Stack } from 'src/modules/stack/entities/Stack';
import {
  Project as ProjectRaw,
  ProjectsOnStacks as ProjectsOnStacksRaw,
  Stack as StackRaw,
} from '@prisma/client';

type PrismaProjectWithRelations = ProjectRaw & {
  stacks: (ProjectsOnStacksRaw & {
    stack: StackRaw;
  })[];
};

export class PrismaProjectMapper {
  static toPrisma(proj: Project): ProjectRaw {
    return {
      id: proj.id ?? 0,
      title: proj.title,
      description: proj.description,
      projectUrl: proj.projectUrl,
      videoUrl: proj.videoUrl,
      coverUrl: proj.coverUrl,
      githubUrl: proj.githubUrl,
    };
  }

  static toDomain(raw: PrismaProjectWithRelations): {
    project: Project;
    stacks: Stack[];
  } {
    const domainStacks = raw.stacks.map((item) => {
      const { id, ...props } = item.stack;
      return new Stack({ projectsId: [], ...props }, id);
    });

    const stacksId = domainStacks.map((s) => s.id) as number[];

    return {
      stacks: domainStacks,
      project: new Project(
        {
          title: raw.title,
          description: raw.description,
          projectUrl: raw.projectUrl,
          githubUrl: raw.githubUrl,
          videoUrl: raw.videoUrl,
          coverUrl: raw.coverUrl,
          stacksId,
        },
        raw.id,
      ),
    };
  }
}
