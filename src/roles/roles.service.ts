import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      const newRole = this.roleRepository.create(createRoleDto);
      return await this.roleRepository.save(newRole);
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

  async findAll() {
    try {
      const roles = await this.roleRepository.find();
      if (!roles || roles.length === 0) {
        throw new BadRequestException({
          error: `No se encontraron sucursales`,
          message: `No hay sucursales en la base de datos`,
        });
      }
      return roles;
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

  async findOne(id: number) {
    try {
      const role = await this.roleRepository.findOne({
        where: { id },
      });
      if (!role) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El rol con ID ${id} NO Existe`,
          message: `Rol con ID ${id} no fue encontrado`,
        });
      }
      return role;
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

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const existingRole = await this.findOne(id);
      const updateResult = await this.roleRepository.update(id, updateRoleDto);
      if (updateResult.affected === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El Rol con ID ${id} NO se actualizó correctamente`,
          message: `Rol con ID ${id} no se actualizó correctamente`,
        });
      }
      return this.findOne(id);
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

  async remove(id: number) {
    try {
      const role = await this.findOne(id);
      if (!role) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Rol con ID ${id} NO Existe`,
          message: `Rol con ID ${id} no fue encontrada`,
        });
      }
      await this.roleRepository.delete(id);
      return {
        success: true,
        message: `Se eliminó el Rol con ID: ${id}`,
      };
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
