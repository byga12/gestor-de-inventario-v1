import { UserRole } from '@by/types';

export interface JwtPayload {
  iss: string;
  sub: string;
  exp: number;
  iat: number;
  role: UserRole;
}
