import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Agency } from '../../agencies/entities/agency.entity';

@Entity('departamentos')
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  departamento: string;

  @OneToMany(() => Agency, (agency) => agency.department_id)
  agencys: Agency[];
}
