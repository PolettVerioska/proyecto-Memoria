import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateHabitoPartialDto } from 'src/modules/habito/dto/create-habito-partial.dto';
import { CreateSignoSintomaPartialDto } from 'src/modules/signo_sintoma/dto/create-signo_sintoma-partial.dto';

export class CreateAnamnesisClinicaDto {
  @IsString()
  @MinLength(1)
  antecedenteFamiliar: string;

  @IsString()
  @MinLength(1)
  patologiaBase: string;

  @IsString()
  @MinLength(1)
  medicamento: string;

  @IsString()
  @MinLength(1)
  utilizaInsulina: string;

  @IsString()
  @MinLength(1)
  antecedenteQuirurgico: string;

  @IsString()
  @MinLength(1)
  alergia: string;

  @IsString()
  @MinLength(1)
  embarazo: string;

  @IsString()
  @MinLength(1)
  semanaGestacion: string;

  @IsString()
  @MinLength(1)
  complicacionGestacion: string;

  @IsOptional()
  @IsString()
  resultadosExamenes?: string;

  @ValidateNested()
  @Type(() => CreateSignoSintomaPartialDto)
  @IsNotEmpty()
  signoSintoma: CreateSignoSintomaPartialDto;

  @ValidateNested()
  @Type(() => CreateHabitoPartialDto)
  @IsNotEmpty()
  habito: CreateHabitoPartialDto;
}
