import { User as UserRaw } from '@prisma/client';
import { User } from 'src/modules/user/entities/User';

export class PrismaUserMapper {
  static toPrisma(user: User): UserRaw {
    return {
      email: user.email,
      name: user.name,
      password: user.password,
      id: user.id!,
    };
  }

  static toDomain({ id, ...raw }: UserRaw): User {
    return new User(raw, id);
  }
}
