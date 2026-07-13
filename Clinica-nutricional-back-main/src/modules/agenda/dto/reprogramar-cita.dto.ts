import { IsDateString } from 'class-validator';

export class ReprogramarCitaDto{
    @IsDateString({}, {message: 'La fecha y hora deben tener un formato válido.'})
    nuevaFechaHora: string;
}