export interface StackProps {
  name: string;
  projectsId: number[];
}

interface PublicStack {
  id: number | undefined;
  name: string;
  projectsId: number[];
}

export class Stack {
  constructor(props: StackProps, id?: number) {
    this.id = id;
    this.name = props.name;
    this.projectsId = props.projectsId;
  }

  private _name: string;
  private _id: number | undefined;
  private _projectsId: number[];

  set id(id: number | undefined) {
    this._id = id;
  }
  get id(): number | undefined {
    return this._id;
  }

  set projectsId(id: number[]) {
    this._projectsId = id;
  }
  get projectsId(): number[] {
    return this._projectsId;
  }

  set name(name: string) {
    this._name = name;
  }
  get name(): string {
    return this._name;
  }

  toPublic(): PublicStack {
    return {
      id: this.id,
      name: this.name,
      projectsId: this.projectsId,
    };
  }
}
