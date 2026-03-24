import { Project } from 'src/modules/project/entities/Project';
import { Stack } from 'src/modules/stack/entities/Stack';

export class ProjectViewModel {
  static toHttp({
    project,
    stacks = [],
  }: {
    project: Project;
    stacks?: Stack[];
  }) {
    return {
      id: project.id,
      title: project.title,
      description: project.description,
      githubUrl: project.githubUrl,
      projectUrl: project.projectUrl,
      coverUrl: project.coverUrl,
      videoUrl: project.videoUrl,
      stacks: stacks.map((stack) => ({
        id: stack.id,
        name: stack.name,
      })),
    };
  }
}
