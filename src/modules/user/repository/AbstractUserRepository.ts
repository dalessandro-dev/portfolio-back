import { User } from '../entities/User';

export abstract class AbstractUserRepository {
  abstract findByEmail(email: string): Promise<User | null>;
}
