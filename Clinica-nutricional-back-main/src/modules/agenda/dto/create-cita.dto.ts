import {IsInt, IsPositive, IsDateString, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateCitaDto {
    @IsNumber()
    rut: number;

    @IsDateString({}, { message: 'La fecha y hora deben tener un formato válido.'})
    fechaHora: string;

    @IsOptional()
    @IsString({ message: 'Las notas deben ser una cadena de texto.'})
    notas?: string;
}
