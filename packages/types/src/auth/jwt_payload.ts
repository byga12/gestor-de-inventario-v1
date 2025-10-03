import { UserRole } from '../user/userRole';

export interface UserPayload {
  name: string;
  id: string;
  username: string;
  role: UserRole;
}

export interface JwtPayload {
  iss: string;
  sub: string;
  exp?: number;
  iat?: number;
  user: UserPayload;
}
