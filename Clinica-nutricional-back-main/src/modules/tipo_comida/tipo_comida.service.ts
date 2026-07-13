import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateTipoComidaDto } from './dto/create-tipo_comida.dto';
import { UpdateTipoComidaDto } from './dto/update-tipo_comida.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoComida } from './entities/tipo_comida.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TipoComidaService {
  private readonly logger = new Logger(TipoComidaService.name);
  
  
  constructor(
    @InjectRepository(TipoComida)
    private readonly tipocomidaRepository: Repository<TipoComida>,
  ) {}

  async onModuleInit() {
    const cantidadTipos = await this.tipocomidaRepository.count();

    if (cantidadTipos === 0) {
      this.logger.log('No se encontraron Tipos de Comida. Iniciando proceso de creación de Tipos de Comida...');

      const tipoComidas = [
        { tipoComida: 'Desayuno' },
        { tipoComida: 'Colación media mañana' },
        { tipoComida: 'Almuerzo' },
        { tipoComida: 'Colación media tarde' },
        { tipoComida: 'Once' },
        { tipoComida: 'Cena' },
      ];

      try {
        await this.tipocomidaRepository.insert(tipoComidas);
        this.logger.log('Tipos de Comida creados exitosamente.');
      } catch (error) {
        this.logger.error('Error al crear los Tipos de Comida:', error);
      }
    }
  }
    

  public async findTiposComidas(): Promise<TipoComida[]> {
    return this.tipocomidaRepository.createQueryBuilder('tipoComida').getMany();
  }
}
