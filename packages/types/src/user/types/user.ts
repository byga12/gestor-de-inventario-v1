import { UserRole } from '../userRole';

export interface User {
  id: string;
  role: UserRole;
  username: string;
  password: string;
  name: string;
  surname: string;
  creation_date: Date;
  deletedAt: Date;
}
