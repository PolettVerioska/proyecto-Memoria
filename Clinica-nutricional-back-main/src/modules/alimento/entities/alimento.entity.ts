import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Ficha } from 'src/modules/ficha/entities/ficha.entity';

@Entity({ name: 'ALIMENTO' })
export class Alimento {
  @Column({
    primary: true,
    type: 'integer',
    name: 'ID',
    generated: 'increment',
  })
  id: number;
  @Column({
    type: 'text',
    name: 'ALIMENTO',
    nullable: false,
  })
  alimento: string;

  @Column({
    type: 'date',
    name: 'FECHA_ELIMINACION',
    nullable: true,
  })
  fechaEliminacion: Date | null;

  @ManyToOne(() => Ficha,{
    nullable: true,
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'FK_FICHA' })
  fkFicha: Ficha;
}
