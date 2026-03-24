export interface ProjectProps {
  title: string;
  description: string;
  videoUrl: string;
  stacksId: number[];
  coverUrl: string;
  projectUrl: string;
  githubUrl: string;
}

interface PublicProject {
  id: number | undefined;
  title: string;
  description: string;
  videoUrl: string;
  stacksId: number[];
  coverUrl: string;
  projectUrl: string;
  githubUrl: string;
}

export class Project {
  constructor(props: ProjectProps, id?: number) {
    this.id = id;
    this.coverUrl = props.coverUrl;
    this.title = props.title;
    this.description = props.description;
    this.stacksId = props.stacksId;
    this.videoUrl = props.videoUrl;
    this.githubUrl = props.githubUrl;
    this.projectUrl = props.projectUrl;
  }

  private _id: number | undefined;
  private _title: string;
  private _description: string;
  private _videoUrl: string;
  private _stacksId: number[];
  private _coverUrl: string;
  private _githubUrl: string;
  private _projectUrl: string;

  set id(id: number | undefined) {
    this._id = id;
  }
  get id(): number | undefined {
    return this._id;
  }

  set stacksId(ids: number[]) {
    this._stacksId = ids;
  }
  get stacksId(): number[] {
    return this._stacksId;
  }

  set projectUrl(url: string) {
    this._projectUrl = url;
  }
  get projectUrl(): string {
    return this._projectUrl;
  }

  set githubUrl(url: string) {
    this._githubUrl = url;
  }
  get githubUrl(): string {
    return this._githubUrl;
  }

  set title(title: string) {
    this._title = title;
  }
  get title(): string {
    return this._title;
  }

  set description(description: string) {
    this._description = description;
  }
  get description(): string {
    return this._description;
  }

  set videoUrl(videoUrl: string) {
    this._videoUrl = videoUrl;
  }
  get videoUrl(): string {
    return this._videoUrl;
  }

  set coverUrl(coverUrl: string) {
    this._coverUrl = coverUrl;
  }
  get coverUrl(): string {
    return this._coverUrl;
  }

  toPublic(): PublicProject {
    return {
      id: this.id,
      videoUrl: this.videoUrl,
      title: this.title,
      description: this.description,
      stacksId: this.stacksId,
      coverUrl: this.coverUrl,
      githubUrl: this.githubUrl,
      projectUrl: this.projectUrl,
    };
  }
}
