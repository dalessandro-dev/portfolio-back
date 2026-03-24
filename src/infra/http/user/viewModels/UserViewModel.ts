import { User } from 'src/modules/user/entities/User';

export class UserViewModel {
  static toHttp({ email, id, name, password }: User) {
    return {
      id,
      email,
      password,
      name,
    };
  }
}
