import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateAnamnesisClinicaDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  antecedenteFamiliar?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  patologiaBase?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  medicamento?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  utilizaInsulina?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  antecedenteQuirurgico?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  alergia?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  embarazo?: string;
  
  @IsOptional()
  @IsString()
  @MinLength(1)
  semanaGestacion?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  complicacionGestacion?: string;
}
