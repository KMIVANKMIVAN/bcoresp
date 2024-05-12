import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { Agency } from '../agencies/entities/agency.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Agency)
    private readonly agencyRepository: Repository<Agency>,
  ) { }

  async createSeed(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { roles, agency_id, ...userData } = createUserDto;

      const rolesExistente = await this.roleRepository.findByIds(roles);
      if (rolesExistente.length !== roles.length) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Uno o más roles proporcionados no existen`,
          message: `Uno o más roles proporcionados  no fueron encontrados`,
        });
      }

      const sucursalExistente = await this.agencyRepository.findOne({
        where: { id: agency_id },
      });

      if (!sucursalExistente) {
        throw new BadRequestException({
          statusCode: 400,
          error: `La sucursal proporcionada no existen`,
          message: `La sucursal proporcionada no fueron encontrados`,
        });
      }
      
      const hashedPassword = await bcrypt.hash(userData.contrasenia, 10);
      
      const usuario = this.userRepository.create({
        ...userData,
        contrasenia: hashedPassword,
        roles: rolesExistente,
        agency_id: sucursalExistente,
      });

      return this.userRepository.save(usuario);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (create): ${error}`,
          message: `Error del Servidor en (create): ${error}`,
        });
      }
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { roles, agency_id, ...userData } = createUserDto;

      const rolesExistente = await this.roleRepository.findByIds(roles);
      if (rolesExistente.length !== roles.length) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Uno o más roles proporcionados no existen`,
          message: `Uno o más roles proporcionados  no fueron encontrados`,
        });
      }

      const sucursalExistente = await this.agencyRepository.findOne({
        where: { id: agency_id },
      });

      if (!sucursalExistente) {
        throw new BadRequestException({
          statusCode: 400,
          error: `La sucursal proporcionada no existen`,
          message: `La sucursal proporcionada no fueron encontrados`,
        });
      }

      
      const hashedPassword = await bcrypt.hash(userData.contrasenia, 10);

      
      const usuario = this.userRepository.create({
        ...userData,
        contrasenia: hashedPassword,
        roles: rolesExistente,
        agency_id: sucursalExistente,
      });

      delete usuario.contrasenia;

      return this.userRepository.save(usuario);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (create): ${error}`,
          message: `Error del Servidor en (create): ${error}`,
        });
      }
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      if (!users || users.length === 0) {
        throw new BadRequestException({
          error: `No se encontraron usuarios`,
          message: `No hay usuarios en la base de datos`,
        });
      }
      users.forEach((user) => delete user.contrasenia);
      return users;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findAll): ${error}`,
          message: `Error del Servidor en (findAll): ${error}`,
        });
      }
    }
  }

  async findOne(id: number): Promise<User | undefined> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new BadRequestException({
          error: `El User con ID ${id} NO Existe`,
          message: `User con ID ${id} no fue encontrado`,
        });
      }
      delete user.contrasenia;
      return user;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findOne): ${error}`,
          message: `Error del Servidor en (findOne): ${error}`,
        });
      }
    }
  }

  async findOnePw(id: number): Promise<User | undefined> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new BadRequestException({
          error: `El User con ID ${id} NO Existe`,
          message: `User con ID ${id} no fue encontrado`,
        });
      }
      return user;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findOne): ${error}`,
          message: `Error del Servidor en (findOne): ${error}`,
        });
      }
    }
  }

  async findOneCi(ci: string): Promise<User[] | undefined> {
    try {
      const users = await this.userRepository
        .createQueryBuilder('usuarios')
        .where('usuarios.ci ILIKE :ci', { ci: `%${ci}%` })
        .take(5)
        .getMany();
      if (!users || users.length === 0) {
        throw new BadRequestException({
          error: `El User con dato ${ci} NO Existe`,
          message: `User con dato ${ci} no fue encontrado`,
        });
      }
      users.forEach((user) => delete user.contrasenia);

      return users;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findOneCi): ${error}`,
          message: `Error del Servidor en (findOneCi): ${error}`,
        });
      }
    }
  }

  async findOneByUserCi(ci: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { ci },
        relations: ['roles'],
      });
      if (!user) {
        throw new BadRequestException({
          statusCode: 400,
          error: `User con CI ${ci} NO Existe`,
          message: `User con CI ${ci} no fue encontrado`,
        });
      }
      return user;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (findOneByUserCi): ${error.message}`,
          message: `Error del Servidor en (findOneByUserCi): ${error.message}`,
        });
      }
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      const user = await this.findOne(id);
      if (!user) {
        throw new BadRequestException({
          statusCode: 400,
          error: `User con ID ${id} NO Existe`,
          message: `User con ID ${id} no fue encontrada`,
        });
      }
      const userUpdated = Object.assign(user, updateUserDto);
      delete userUpdated.contrasenia;

      return await this.userRepository.save(userUpdated);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (update): ${error}`,
          message: `Error del Servidor en (update): ${error}`,
        });
      }
    }
  }

  async updateContrasenia(
    id: number,
    contraseniaAntigua: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Partial<User>> {
    try {
      const user = await this.findOnePw(id);
      if (!user) {
        throw new BadRequestException({
          statusCode: 400,
          error: `User con ID ${id} NO Existe`,
          message: `User con ID ${id} no fue encontrada`,
        });
      }

      const contraseniaCorrecta = await bcrypt.compare(
        contraseniaAntigua,
        user.contrasenia,
      );

      if (!contraseniaCorrecta) {
        throw new BadRequestException({
          statusCode: 400,
          error: 'La contraseña anterior no es correcta',
          message: 'La contraseña anterior no es correcta',
        });
      }

      if (!updateUserDto.contrasenia) {
        throw new BadRequestException({
          statusCode: 400,
          error: 'La nueva contraseña no puede estar vacía',
          message: 'La nueva contraseña no puede estar vacía',
        });
      }

      const hashedPassword = await bcrypt.hash(
        updateUserDto.contrasenia,
        10,
      );
      user.contrasenia = hashedPassword;
      user.se_cambiado_cntr = true;

      const updatedUser = await this.userRepository.save(user);

      delete updatedUser.contrasenia;

      return updatedUser;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (updateContrasenia): ${error}`,
          message: `Error del Servidor en (updateContrasenia): ${error}`,
        });
      }
    }
  }


  async remove(id: number): Promise<any> {
    try {
      const user = await this.findOne(id);
      if (!user) {
        throw new BadRequestException({
          statusCode: 400,
          error: `User con ID ${id} NO Existe`,
          message: `User con ID ${id} no fue encontrada`,
        });
      }
      await this.userRepository.delete(id);
      return { success: true, message: `Se eliminó el usuario con ID: ${id}` };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del Servidor en (remove): ${error}`,
          message: `Error del Servidor en (remove): ${error}`,
        });
      }
    }
  }
}
