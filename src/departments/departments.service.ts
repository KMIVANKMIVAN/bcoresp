import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) { }

  async create(createDepartmentDto: CreateDepartmentDto) {
    try {
      const newDepartamento = this.departmentRepository.create(
        createDepartmentDto,
      );
      return await this.departmentRepository.save(newDepartamento);
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
      const departamentos = await this.departmentRepository.find();
      if (!departamentos || departamentos.length === 0) {
        throw new BadRequestException({
          error: `No se encontraron departamentos`,
          message: `No hay departamentos en la base de datos`,
        });
      }
      return departamentos;
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
      const departamento = await this.departmentRepository.findOne({
        where: { id },
      });
      if (!departamento) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El departamento con ID ${id} NO Existe`,
          message: `Department con ID ${id} no fue encontrado`,
        });
      }
      return departamento;
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

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    try {
      const existingDepartamento = await this.findOne(id);
      if (!existingDepartamento) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Department con ID ${id} NO Existe`,
          message: `Department con ID ${id} no fue encontrada`,
        });
      }
      const updateResult = await this.departmentRepository.update(
        id,
        updateDepartmentDto,
      );
      if (updateResult.affected === 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El Department con ID ${id} NO se actualizó correctamente`,
          message: `Department con ID ${id} no se actualizó correctamente`,
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
      const departamento = await this.findOne(id);
      if (!departamento) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Department con ID ${id} NO Existe`,
          message: `Department con ID ${id} no fue encontrada`,
        });
      }
      await this.departmentRepository.delete(id);
      return {
        success: true,
        message: `Se eliminó el Department con ID: ${id}`,
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
