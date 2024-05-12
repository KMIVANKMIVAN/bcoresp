import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { User } from '../users/entities/user.entity';
import { Agency } from '../agencies/entities/agency.entity';
import { Department } from '../departments/entities/department.entity';
import { Role } from '../roles/entities/role.entity';

import { UsersService } from '../users/users.service';
import { AgenciesService } from '../agencies/agencies.service';
import { DepartmentsService } from '../departments/departments.service';
import { RolesService } from '../roles/roles.service';

import { SEED_AGENCIES, SEED_DEPARTMENTS, SEED_ROLES, SEED_USRS } from "./data/seed.data";

@Injectable()

export class SeedsService {
  private isProd: boolean;
  constructor(
    private readonly configService: ConfigService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Agency)
    private readonly agencyRepository: Repository<Agency>,

    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    private readonly usuarioService: UsersService,
    private readonly agenciaService: AgenciesService,
    private readonly departamentosService: DepartmentsService,
    private readonly rolesService: RolesService,
  ) {
    this.isProd = configService.get('STATE') === 'prod';
  }

  async ejecutarSemilla() {
    try {
      if (this.isProd) {
        throw new BadRequestException({
          statusCode: 400,
          error: `Error al ejecutar la semilla`,
          message: `Problemas en la ejecucion de la semilla`,
        });
      }

      // Limpiar la base de datos BORRAR TODO
      // await this.eliminarTableDatabase();

      /* await this.crearDepartamentos();
      await this.crearRol();
      await this.crearAgencia();

      await this.crearUsuario();

      return true; */
      const resultados = {};
      resultados['SeCreo'] = 'Se creado con exito se mostrara algunos datos';
      resultados['departamentos'] = await this.crearDepartamentos();
      resultados['roles'] = await this.crearRol();
      resultados['agencias'] = await this.crearAgencia();
      resultados['usuarios'] = await this.crearUsuario();

      return resultados;
    } catch (error) {
      // Manejo de excepciones
      throw new InternalServerErrorException({
        statusCode: 500,
        error: `Error del Servidor en (ejecutarSemilla): ${error}`,
      });
    }
  }


  async eliminarTableDatabase() {
    // borrar usuarios
    await this.userRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();

    // borrar empresas
    await this.agencyRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();

    // borrar tipo empresas
    await this.departmentRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();

    // borrar rol
    await this.roleRepository.createQueryBuilder().delete().where({}).execute();
  }

  async crearDepartamentos(): Promise<Department> {
    const departamentos = [];

    for (const departamento of SEED_DEPARTMENTS) {
      departamentos.push(await this.departamentosService.create(departamento));
    }

    return departamentos[0];
  }

  async crearRol(): Promise<Role> {
    const roles = [];

    for (const rol of SEED_ROLES) {
      roles.push(await this.rolesService.create(rol));
    }

    return roles[0];
  }

  async crearAgencia(): Promise<Agency[]> {
    const agencias = [];

    for (const agenciaData of SEED_AGENCIES) {
      const departamento = await this.departmentRepository.findOneOrFail({
        where: { id: agenciaData.department_id },
      });
      const nuevaAgencia = await this.agenciaService.create({
        agencia: agenciaData.agencia,
        department_id: departamento.id,
      });
      agencias.push(nuevaAgencia);
    }
    return agencias;
  }

  async crearUsuario(): Promise<User[]> {
    const usuarios = [];

    for (const userData of SEED_USRS) {
      const roles = await this.roleRepository.findByIds(userData.roles);
      const nuevoUsuario = await this.usuarioService.createSeed({
        nombres: userData.nombres,
        apellidos: userData.apellidos,
        ci: userData.ci,
        complemento: userData.complemento,
        correo: userData.correo,
        es_activo: userData.es_activo,
        se_cambiado_cntr: userData.se_cambiado_cntr,
        roles: roles.map((role) => role.id),
        agency_id: userData.agency_id,
        contrasenia: userData.contrasenia,
      });
      usuarios.push(nuevoUsuario);
    }

    return usuarios;
  }

}
