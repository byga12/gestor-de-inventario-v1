import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { SignInDto } from '@by/types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(signInDto: SignInDto) {
    const { username, password } = signInDto;
    const user = await this.userService.getUserByUsername(username);

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }
    const payload = {
      iss: 'localtest',
      sub: user.id,
      role: user.role,
    };
    const token = await this.jwtService.signAsync(payload);
    return { token };
  }
}
