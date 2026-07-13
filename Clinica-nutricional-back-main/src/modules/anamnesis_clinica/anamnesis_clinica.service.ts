import { Injectable } from '@nestjs/common';
import { CreateAnamnesisClinicaDto } from './dto/create-anamnesis_clinica.dto';
import { UpdateAnamnesisClinicaDto } from './dto/update-anamnesis_clinica.dto';
import { AnamnesisClinica } from './entities/anamnesis_clinica.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HabitoService } from '../habito/habito.service';
import { SignoSintomaService } from '../signo_sintoma/signo_sintoma.service';

@Injectable()
export class AnamnesisClinicaService {
  constructor(
    @InjectRepository(AnamnesisClinica)
    private readonly repository: Repository<AnamnesisClinica>,
    private readonly habitoService: HabitoService,
    private readonly signoSintomaticoService: SignoSintomaService,
  ) {}

  public async createAnamnesisClinica(
    createAnamnesisClinicaDto: CreateAnamnesisClinicaDto,
  ): Promise<AnamnesisClinica> {
    const anamnesisClinica = this.repository.create({
      alergia: createAnamnesisClinicaDto.alergia,
      antecedenteQuirurgico: createAnamnesisClinicaDto.antecedenteQuirurgico,
      antecedenteFamiliar: createAnamnesisClinicaDto.antecedenteFamiliar,
      medicamento: createAnamnesisClinicaDto.medicamento,
      utilizaInsulina: createAnamnesisClinicaDto.utilizaInsulina,
      patologiaBase: createAnamnesisClinicaDto.patologiaBase,
      embarazo: createAnamnesisClinicaDto.embarazo,
      semanaGestacion: createAnamnesisClinicaDto.semanaGestacion,
      complicacionGestacion: createAnamnesisClinicaDto.complicacionGestacion,
    });

    const anamnesisClinicaWithId = await this.repository.save(anamnesisClinica);

    await this.habitoService.createHabito({
      actividadFisica: createAnamnesisClinicaDto.habito.actividadFisica,
      alcohol: createAnamnesisClinicaDto.habito.alcohol,
      droga: createAnamnesisClinicaDto.habito.droga,
      fkAnamnesisClinica_id: anamnesisClinicaWithId.id,
    });

    await this.signoSintomaticoService.createSignoSintoma({
      presionArterial: createAnamnesisClinicaDto.signoSintoma.presionArterial,
      glicemia: createAnamnesisClinicaDto.signoSintoma.glicemia,
      apetito: createAnamnesisClinicaDto.signoSintoma.apetito,
      calambre: createAnamnesisClinicaDto.signoSintoma.calambre,
      deposicionBristol:
        createAnamnesisClinicaDto.signoSintoma.deposicionBristol,
      diuresis: createAnamnesisClinicaDto.signoSintoma.diuresis,
      otro: createAnamnesisClinicaDto.signoSintoma.otro,
      polidipsia: createAnamnesisClinicaDto.signoSintoma.polidipsia,
      polifagia: createAnamnesisClinicaDto.signoSintoma.polifagia,
      poliuria: createAnamnesisClinicaDto.signoSintoma.poliuria,
      sudoracionNocturna:
        createAnamnesisClinicaDto.signoSintoma.sudoracionNocturna,
      tinitus: createAnamnesisClinicaDto.signoSintoma.tinitus,
      fkAnamnesisClinica_id: anamnesisClinicaWithId.id,
    });

    return anamnesisClinicaWithId;
  }

  public async updateAnamnesisClinica(
    id: number,
    updateAnamnesisClinicaDto: UpdateAnamnesisClinicaDto,
  ): Promise<AnamnesisClinica> {
    const anamnesisClinica = await this.repository
      .createQueryBuilder('anamnesisClinica')
      .where('anamnesisClinica.id = :id', { id })
      .getOne();

    if (!anamnesisClinica) {
      throw new Error('Anamnesis Clinica not found');
    }

    const updatedAnamnesisClinica = this.repository.merge(anamnesisClinica, {
      alergia: updateAnamnesisClinicaDto.alergia,
      antecedenteQuirurgico: updateAnamnesisClinicaDto.antecedenteQuirurgico,
      antecedenteFamiliar: updateAnamnesisClinicaDto.antecedenteFamiliar,
      medicamento: updateAnamnesisClinicaDto.medicamento,
      utilizaInsulina: updateAnamnesisClinicaDto.utilizaInsulina,
      patologiaBase: updateAnamnesisClinicaDto.patologiaBase,
      embarazo: updateAnamnesisClinicaDto.embarazo,
      semanaGestacion: updateAnamnesisClinicaDto.semanaGestacion,
      complicacionGestacion: updateAnamnesisClinicaDto.complicacionGestacion,
    });

    return this.repository.save(updatedAnamnesisClinica);
  }
}
