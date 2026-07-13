import {
    IsArray,
    IsInt,
    IsNotEmpty,
    IsString,
    ArrayNotEmpty,
    IsNumber,
    Min
} from 'class-validator';



export class CreateSolicitudExamenDto {
    @IsNumber()
    @Min(1)
    fkFicha_id: number;

    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({}, { each: true }) 
    solicitud_examen_ids: number[];    
}
