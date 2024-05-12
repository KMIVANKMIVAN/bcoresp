import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { DepartmentsModule } from './departments/departments.module';
import { AgenciesModule } from './agencies/agencies.module';

import { User } from './users/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import { Agency } from './agencies/entities/agency.entity';
import { Department } from './departments/entities/department.entity';
import { SeedsModule } from './seeds/seeds.module';

import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

const bdType = 'postgres'
// const bdType= 'mysql'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.developer',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: bdType,
        host: configService.get<string>('BDHOST'),
        port: configService.get<number>('BDPORT'),
        username: configService.get<string>('BDUSERNAME'),
        password: configService.get<string>('BDPASSWORD'),
        database: configService.get<string>('BDDATABASE'),
        entities: [User, Role, Agency, Department],
        synchronize: true, // Utilizar 'false' en producción
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    DepartmentsModule,
    AgenciesModule,
    SeedsModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },],
})
export class AppModule { }
