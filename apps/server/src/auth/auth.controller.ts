import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from '@by/types';
import { AuthGuard } from './auth.guard';
import type { Response } from 'express';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    const token = await this.authService.signIn(signInDto);
    return { token };
  }

  @UseGuards(AuthGuard)
  @Post('revalidate')
  revalidate() {
    return {
      isValid: true,
    };
  }
}
