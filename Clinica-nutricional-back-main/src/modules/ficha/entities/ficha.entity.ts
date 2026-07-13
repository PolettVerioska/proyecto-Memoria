import { AnamnesisAlimentaria } from 'src/modules/anamnesis_alimentaria/entities/anamnesis_alimentaria.entity';
import { AnamnesisClinica } from 'src/modules/anamnesis_clinica/entities/anamnesis_clinica.entity';
import { AnamnesisSocial } from 'src/modules/anamnesis_social/entities/anamnesis_social.entity';
import { Antropometria } from 'src/modules/antropometria/entities/antropometria.entity';
import { EncuestaTendenciaConsumo } from 'src/modules/encuesta_tendencia_consumo/entities/encuesta_tendencia_consumo.entity';
import { Examen } from 'src/modules/examen/entities/examen.entity';
import { PlanNutricional } from 'src/modules/plan-nutricional/entities/plan-nutricional.entity';
import { Registro24h } from 'src/modules/registro24h/entities/registro24h.entity';
import { Usuario } from 'src/modules/usuario/entities/usuario.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, JoinTable, ManyToMany } from 'typeorm';
import { SolicitudExamen } from 'src/modules/solicitud_examen/entities/solicitud_examen.entity';
import { Alimento } from 'src/modules/alimento/entities/alimento.entity';

@Entity({ name: 'FICHA' })
export class Ficha {
  @Column({
    primary: true,
    type: 'integer',
    name: 'ID',
    generated: 'increment',
  })
  id: number;

  @Column({
    type: 'date',
    name: 'FECHA_CREACION',
    nullable: false,
  })
  fechaCreacion: Date;

  @Column({
    type: 'date',
    name: 'FECHA_ELIMINACION',
    nullable: true,
  })
  fechaEliminacion: Date | null;

  @ManyToOne(() => Usuario, {
    nullable: true,
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'FK_USUARIO' })
  fkUsuario: Usuario;

  @ManyToOne(() => AnamnesisSocial, {
    nullable: true,
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'FK_ANAMNESIS_SOCIAL' })
  fkAnamnesisSocial: AnamnesisSocial;

  @ManyToOne(() => AnamnesisClinica, {
    nullable: true,
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'FK_ANAMNESIS_CLINICA' })
  fkAnamnesisClinica: AnamnesisClinica;

  @ManyToOne(() => AnamnesisAlimentaria, {
    nullable: true,
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'FK_ANAMNESIS_ALIMENTARIA' })
  fkAnamnesisAlimentaria: AnamnesisAlimentaria;

  @ManyToOne(() => EncuestaTendenciaConsumo, {
    nullable: true,
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'FK_ENCUESTA_TENDENCIA_CONSUMO' })
  fkEncuestaTendenciaConsumo: EncuestaTendenciaConsumo;

  @OneToMany(() => Antropometria, (antropometria) => antropometria.fkFicha)
  antropometrias: Antropometria[];

  @OneToMany(() => Registro24h, (registro24h) => registro24h.fkFicha)
  registros24h: Registro24h[];

  @OneToMany(
    () => PlanNutricional,
    (planNutricional: PlanNutricional) => planNutricional.fkFicha,
  )
  planesNutricionales: PlanNutricional[];

  @OneToMany(() => Examen, (examen: Examen) => examen.fkFicha)
  examenes: Examen[];

  @ManyToMany(() => SolicitudExamen)
  @JoinTable({
    name: 'r_ficha_solicitud_examen',
    joinColumn: {
      name: 'fkFicha_id',
      referencedColumnName: 'id'},
      inverseJoinColumn: {
        name: 'fkSolicitudExamen_id',
        referencedColumnName: 'id'
      }
    })
  solicitudesExamen: SolicitudExamen[];
 
  @OneToMany(() => Alimento, (alimento) => alimento.fkFicha)
  alimentos: Alimento[];
}
