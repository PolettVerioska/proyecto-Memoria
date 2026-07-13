import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Ficha } from 'src/modules/ficha/entities/ficha.entity';

@Entity({ name: 'SOLICITUD_EXAMEN' })
export class SolicitudExamen {
    @Column({
        primary: true,
        type: 'integer',
        name: 'ID',
        generated: 'increment',
    })
    id: number;

    @Column({
        type: 'text',
        name: 'NOMBRE_EXAMEN',
        nullable: false,
    })
    nombreExamen: string;

    @Column({
        type: 'date',
        name: 'FECHA_ELIMINACION',
        nullable: true,
    })
    fechaEliminacion: Date | null;

    

}
