import { IsEnum, IsString, ValidateIf } from "class-validator";
import { EstadoCita } from '../entities/cita.entity';

export class UpdateEstadoCitaDto {
    @IsEnum(EstadoCita, { message: 'El estado ingresado no es valido según los parámetros establecidos.' })
    estado: EstadoCita;

    @ValidateIf((objeto) => objeto.estado === EstadoCita.CANCELADA)
    @IsString({message: 'El motivo de cancelación es obligatorio y debe ser texto.'})
    motivoCancelacion?: string;
}