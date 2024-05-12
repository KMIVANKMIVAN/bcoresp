import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async signIn(ci: string, contrasenia: string): Promise<any> {
    try {
      const user = await this.usersService.findOneByUserCi(ci);
      if (!user) {
        throw new BadRequestException({
          error: `El Usuario con CI ${ci} NO Existe`,
        });
      }
      const isMatch = await bcrypt.compare(contrasenia, user.contrasenia);
      if (isMatch) {
        const roles = user.roles.map(role => role.id);
        const payload = {
          sub: user.id,
          username: user.ci,
          camb_contra: user.se_cambiado_cntr,
          roles: roles, // Incluyendo los roles en el payload
        };
        return {
          tk: await this.jwtService.signAsync(payload),
        };
      } else {
        throw new UnauthorizedException({
          statusCode: 401,
          error: `Se introdujo una contrasena Incorecta`,
        });
      }
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (signIn): ${error}`,
        });
      }
    }
  }
}
