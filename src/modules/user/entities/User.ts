interface UserProps {
  name: string;
  password: string;
  email: string;
}

interface PublicUser {
  id: number | undefined;
  name: string;
  email: string;
}

export class User {
  constructor({ name, email, password }: UserProps, id?: number) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  private _id: number | undefined;
  private _name: string;
  private _password: string;
  private _email: string;

  set id(id: number | undefined) {
    this._id = id;
  }
  get id(): number | undefined {
    return this._id;
  }

  set name(name: string) {
    this._name = name;
  }
  get name(): string {
    return this._name;
  }

  set password(password: string) {
    this._password = password;
  }
  get password(): string {
    return this._password;
  }

  set email(email: string) {
    this._email = email;
  }
  get email(): string {
    return this._email;
  }

  toPublic(): PublicUser {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }
}
