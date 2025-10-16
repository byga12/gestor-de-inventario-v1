import 'server-only';
import { cookies } from 'next/headers';
import { decode } from 'jsonwebtoken';
import { JwtPayload } from '@by/types';
export const getSession = async (): Promise<null | JwtPayload> => {
  // TODO : ademas de desencriptar el payload, deberia verificar la signature
  const cookie = (await cookies()).get('auth_token');
  if (cookie) {
    const token = cookie.value;
    if (token) {
      const payload = decode(token);
      return payload as JwtPayload;
    }
  }
  return null;
};
