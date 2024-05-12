import { IsString, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @MaxLength(50, { message: 'La longitud máxima es de 50 caracteres' })
  rol: string;
}
