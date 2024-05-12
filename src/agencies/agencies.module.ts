import { Module } from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { AgenciesController } from './agencies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agency } from './entities/agency.entity';

import { DepartmentsModule } from '../departments/departments.module';
import { UsersModule } from '../users/users.module';

import { forwardRef } from '@nestjs/common';

@Module({
  // imports: [TypeOrmModule.forFeature([Agency]), DepartmentsModule, UsersModule],
  imports: [TypeOrmModule.forFeature([Agency]), DepartmentsModule, forwardRef(() => UsersModule)],
  controllers: [AgenciesController],
  providers: [AgenciesService],
  exports: [TypeOrmModule, AgenciesService],
})
export class AgenciesModule { }
