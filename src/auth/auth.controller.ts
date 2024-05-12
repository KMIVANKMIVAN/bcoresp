import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.ci, signInDto.contrasenia);
  }
}
