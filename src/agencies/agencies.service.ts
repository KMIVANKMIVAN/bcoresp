import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';

import { User } from 'src/users/entities/user.entity';
import { Department } from 'src/departments/entities/department.entity';
import { Agency } from './entities/agency.entity';


@Injectable()
export class AgenciesService {
  constructor(
    @InjectRepository(Agency)
    private readonly agencyRepository: Repository<Agency>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createAgencyDto: CreateAgencyDto) {
    try {
      // Buscar el departamento por su ID
      const departamento = await this.departmentRepository.findOne({
        where: { id: createAgencyDto.department_id },
      });
      if (!departamento) {
        throw new BadRequestException({
          statusCode: 400,
          error: `El departamento con ID ${createAgencyDto.department_id} NO Existe`,
          message: `Departamento con ID ${createAgencyDto.department_id} no fue encontrado`,
        });
      }

      // Crear nueva agencia y asignar el departamento
      const newSucursale = new Agency();
      newSucursale.agencia = createAgencyDto.agencia;
      newSucursale.department_id = departamento;

      return await this.agencyRepository.save(newSucursale);
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
      const sucursales = await this.agencyRepository.find();
      if (!sucursales || sucursales.length === 0) {
        throw new BadRequestException({
          error: `No se encontraron sucursales`,
          message: `No hay sucursales en la base de datos`,
        });
      }
      return sucursales;
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

  async findAllPorDep(userId: number) {
    try {
      console.log("lo q llega", userId);

      // Encuentra el usuario con su agencia y el departamento de esa agencia
      const usuario = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['agency_id', 'agency_id.department_id'], // Asegúrate de que estas relaciones estén correctamente definidas
      });

      if (!usuario || !usuario.agency_id || !usuario.agency_id.department_id) {
        throw new BadRequestException({
          error: `No se encontró el usuario o su departamento asignado`,
          message: `El usuario con ID ${userId} no tiene una agencia o departamento asignado`,
        });
      }

      // Encuentra todas las sucursales que pertenecen a ese departamento
      const sucursales = await this.agencyRepository.find({
        where: { department_id: { id: usuario.agency_id.department_id.id } },
      });

      if (!sucursales || sucursales.length === 0) {
        throw new BadRequestException({
          error: `No se encontraron sucursales para el departamento del usuario`,
          message: `No hay sucursales asociadas al departamento del usuario con ID ${userId}`,
        });
      }

      return sucursales;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException({
          statusCode: 500,
          error: `Error del servidor en (findAllPorDep): ${error.message}`,
          message: `Error del servidor en (findAllPorDep): ${error.message}`,
        });
      }
    }
  }

  async findOne(id: number) {
    try {
      const sucursale = await this.agencyRepository.findOne({
        where: { id },
      });
      if (!sucursale) {
        throw new BadRequestException({
          statusCode: 400,
          error: `La agencia con ID ${id} NO Existe`,
          message: `Sucursal con ID ${id} no fue encontrada`,
        });
      }
      return sucursale;
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

  async update(id: number, updateAgencyDto: UpdateAgencyDto) {
    try {
      const existingSucursale = await this.findOne(id);

      // Transforma el DTO en una instancia de Agency
      if (!existingSucursale) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Sucursal con ID ${id} NO Existe`,
          message: `Sucursal con ID ${id} no fue encontrada`,
        });
      }
      const updatedSucursale = Object.assign(
        existingSucursale,
        updateAgencyDto,
      );

      return await this.agencyRepository.save(updatedSucursale);
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

  async remove(id: number): Promise<any> {
    try {
      const sucursale = await this.findOne(id);
      if (!sucursale) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Sucursal con ID ${id} NO Existe`,
          message: `Sucursal con ID ${id} no fue encontrada`,
        });
      }
      await this.agencyRepository.delete(id);
      return { success: true, message: `Se eliminó la Sucursal con ID: ${id}` };
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
