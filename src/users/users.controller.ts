import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  @Get()
  findAll() {
    return this.usersService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(+id);
  }


  @Get('buscarci/:nomci')
  findOneCi(@Param('nomci') nomci: string) {
    return this.usersService.findOneCi(nomci);
  }


  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Patch('updatepw/:id')
  updateContrasenia(
    @Param('id') id: number,
    @Body('contraseniaAntigua') contraseniaAntigua: string, // Nuevo parámetro
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateContrasenia(
      id,
      contraseniaAntigua,
      updateUserDto,
    );
  }


  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(+id);
  }
}
