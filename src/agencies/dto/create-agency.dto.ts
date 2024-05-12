import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateAgencyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'La longitud maxima es de 100 caracteres' })
  agencia: string;

  @IsNumber()
  @IsNotEmpty()
  department_id: number;
}
