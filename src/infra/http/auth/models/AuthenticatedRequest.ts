import type { Request } from 'express';

export class AuthenticatedRequestModel extends Request {
  user: {
    id: number;
    email: string;
    password: string;
    name: string;
  };
}
