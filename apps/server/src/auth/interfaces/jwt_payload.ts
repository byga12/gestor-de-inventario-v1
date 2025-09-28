import { UserRole } from 'src/user/entities/user.entity';

export interface JwtPayload {
  iss: string;
  sub: string;
  exp: number;
  iat: number;
  role: UserRole;
}
