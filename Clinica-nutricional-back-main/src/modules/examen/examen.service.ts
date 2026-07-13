import { Injectable } from '@nestjs/common';
import { CreateExamenDto } from './dto/create-examen.dto';
import { Examen } from './entities/examen.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ExamenService {
  constructor(
    @InjectRepository(Examen)
    private readonly examenRepository: Repository<Examen>,
  ) {}

  public async createExamen(createExamenDto: any): Promise<Examen> {
    const nuevoExamen = this.examenRepository.create({
      fkFicha: { id: createExamenDto.fkFicha_id, },

      nombreArchivo: createExamenDto.nombreArchivo,
      nombreExamen: createExamenDto.nombreExamen,
    });

    return this.examenRepository.save(nuevoExamen);
  }
}
