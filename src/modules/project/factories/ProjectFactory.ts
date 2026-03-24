import { Project, ProjectProps } from '../entities/Project';

export class ProjectFactory {
  createProject(props: ProjectProps, id: number) {
    return new Project(props, id);
  }
}
