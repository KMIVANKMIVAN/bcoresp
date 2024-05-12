import { Module } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { SeedsController } from './seeds.controller';

import { UsersModule } from '../users/users.module';
import { DepartmentsModule } from '../departments/departments.module';
import { AgenciesModule } from '../agencies/agencies.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    DepartmentsModule,
    AgenciesModule,
  ],
  controllers: [SeedsController],
  providers: [SeedsService],
})
export class SeedsModule { }
