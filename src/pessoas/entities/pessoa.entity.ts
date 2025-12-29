import { Recado } from 'src/recados/entities/recado.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(()=> Recado, recado => recado.de)
  recadosEnviados: Recado[];

  @OneToMany(()=> Recado, recado => recado.para)
  recadosRecebidos: Recado[];
}
