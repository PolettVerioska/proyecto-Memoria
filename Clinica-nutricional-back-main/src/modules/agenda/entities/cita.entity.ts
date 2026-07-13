import { Column, Entity, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "src/modules/usuario/entities/usuario.entity";

export enum EstadoCita {
    PENDIENTE = 'PENDIENTE',
    ASISTIO = 'ASISTIÓ',
    CANCELADA = 'CANCELADA',
    REPROGRAMADA = 'REPROGRAMADA',
}


@Entity('citas')
export class Cita {
    @Column({
        primary: true,
        type: 'integer',
        name: 'ID',
        generated: 'increment',
    })
    id: number;

    @Column({
        type: 'timestamp with time zone',
        name: 'FECHA_HORA',
        nullable: false,
    })
    fechaHora: Date;

    @Column({
        type: 'enum',
        name: 'ESTADO',
        enum: EstadoCita,
        default: EstadoCita.PENDIENTE,
        nullable: false,
    })
    estado: EstadoCita;

    @Column({
        type: 'text',
        name: 'MOTIVO_CANCELACION',
        nullable: true,
    })
    motivoCancelacion: string | null;

    @Column({
        type: 'text',
        name: 'NOTAS',
        nullable: true,
    })
    notas: string | null;

    //Relaciones de la entidad.
    //Paciente
    @ManyToOne(() => Usuario, {eager: false, onDelete: 'RESTRICT'})
    @JoinColumn({ name: 'PACIENTE_RUT', referencedColumnName: 'rut'})
    paciente: Usuario;

    @Column({
        type: 'integer',
        name: 'PACIENTE_RUT',
        nullable: false,
    })
    rut: number;

    //Nutricionista
    @ManyToOne(() => Usuario, {eager: false, onDelete: 'RESTRICT'})
    @JoinColumn({ name: 'NUTRICIONISTA_RUT', referencedColumnName: 'rut'})
    nutricionista: Usuario;

    @Column({
        type: 'integer',
        name: 'NUTRICIONISTA_RUT',
        nullable: false,
    })
    nutricionistaRut: number;

    //auditoría y eliminación
    @CreateDateColumn({
        type: 'timestamp',
        name: 'FECHA_CREACION',
        nullable: false,
    })
    fechaCreacion: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'FECHA_ACTUALIZACION',
        nullable: false,
    })
    fechaActualización: Date;

    @Column({
        type: 'date',
        name: 'FECHA_ELIMINACIÓN',
        nullable: true,
    })
    fechaEliminacion: Date | null;
}
