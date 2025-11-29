import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Recado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  texto: string;
  
  @Column() 
  de: string;
  
  @Column()
  para: string;
  
  @Column()
  lido: boolean = false;
  
  @Column()
  data: Date = new Date();
}
