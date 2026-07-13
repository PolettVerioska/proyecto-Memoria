import { Habito } from 'src/modules/habito/entities/habito.entity';
import { SignoSintoma } from 'src/modules/signo_sintoma/entities/signo_sintoma.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'ANAMNESIS_CLINICA' })
export class AnamnesisClinica {
  @Column({
    primary: true,
    type: 'integer',
    name: 'ID',
    generated: 'increment',
  })
  id: number;

  @Column({
    type: 'text',
    name: 'ANTECEDENTE_FAMILIAR',
    nullable: false,
  })
  antecedenteFamiliar: string;

  @Column({
    type: 'text',
    name: 'PATOLOGIA_BASE',
    nullable: false,
  })
  patologiaBase: string;

  @Column({
    type: 'text',
    name: 'MEDICAMENTO',
    nullable: false,
  })
  medicamento: string;

  @Column({
    type: 'text',
    name: 'UTILIZA_INSULINA',
    nullable: false,
  })
  utilizaInsulina: string;

  @Column({
    type: 'text',
    name: 'ANTECEDENTE_QUIRURGICO',
    nullable: false,
  })
  antecedenteQuirurgico: string;

  @Column({
    type: 'text',
    name: 'ALERGIA',
    nullable: false,
  })
  alergia: string;

  @Column({
    type: 'text',
    name: 'EMBARAZO',
    nullable: false,
  })
  embarazo: string;

  @Column({
    type: 'text',
    name: 'SEMANA_GESTACION',
    nullable: false,
  })
  semanaGestacion: string;

  @Column({
    type: 'text',
    name: 'COMPLICACION_GESTACION',
    nullable: false,
  })
  complicacionGestacion: string;

  @Column({
    type: 'text',
    name: 'RESULTADOS_EXAMENES',
    nullable: true,
  })
  resultadosExamenes: string | null;

  @Column({
    type: 'date',
    name: 'FECHA_ELIMINACION',
    nullable: true,
  })
  fechaEliminacion: Date | null;

  @OneToMany(
    () => SignoSintoma,
    (signoSintoma) => signoSintoma.fkAnamnesisClinica,
  )
  signosSintomas: SignoSintoma[];

  @OneToMany(() => Habito, (habito) => habito.fkAnamnesisClinica)
  habitos: Habito[];
}
