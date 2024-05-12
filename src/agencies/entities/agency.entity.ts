import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Department } from '../../departments/entities/department.entity';
import { User } from '../../users/entities/user.entity';

@Entity('agencia')
export class Agency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  agencia: string;

  @ManyToOne(() => Department, (department) => department.agencys)
  @JoinColumn({ name: 'departamento_id' })
  department_id: Department;

  @OneToMany(() => User, (user) => user.agency_id)
  users: User[];
}
