import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between} from 'typeorm';
import { Cita, EstadoCita } from './entities/cita.entity';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateEstadoCitaDto } from './dto/update-estado-cita.dto';
import { ReprogramarCitaDto } from './dto/reprogramar-cita.dto';
import { Usuario } from '../usuario/entities/usuario.entity';


@Injectable()
export class AgendaService {
  constructor(
    @InjectRepository(Cita)
    private readonly citaRepository: Repository<Cita>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async crearCita(createCitaDto: CreateCitaDto, nutricionistaRut: number): Promise<Cita> {
    const { rut, fechaHora, notas } = createCitaDto;
    const fechaPropuesta = new Date(fechaHora);

    const paciente = await this.usuarioRepository.findOne({
      where: { rut },
    });

    if (!paciente) {
      throw new NotFoundException('No se encontró ningún paciente con el rut proporcionado.');
    }

    const citaExistente = await this.citaRepository.findOne({
      where: {
        nutricionistaRut,
        fechaHora: fechaPropuesta,
        estado: EstadoCita.PENDIENTE,
      }
    });

    if(citaExistente) {
      throw new ConflictException('Ya existe una cita agendada en ese horario.');
    }

    const nuevaCita = this.citaRepository.create({
      rut,
      nutricionistaRut,
      fechaHora: fechaPropuesta,
      notas,
      estado: EstadoCita.PENDIENTE,
    });

    return await this.citaRepository.save(nuevaCita);
  }

  async obtenerCitasPorNutricionista(nutricionistaRut: number): Promise<Cita[]> {
    return await this.citaRepository.find({
      where: { nutricionistaRut },
      order: { fechaHora: 'ASC'},
      relations: ['paciente'],
    });
  }

  async buscarPorId(id: number): Promise<Cita> {
    const cita = await this.citaRepository.findOne({where: { id }})
    if (!cita){
      throw new NotFoundException(`Cita con ID ${id} no encontrada.`);
    }
    return cita;
  }

  async actualizarEstado(id: number, updateEstadoCitaDto: UpdateEstadoCitaDto): Promise<Cita> {
    const cita = await this.buscarPorId(id);
    cita.estado = updateEstadoCitaDto.estado;

    if (updateEstadoCitaDto.estado === EstadoCita.CANCELADA) {
      cita.motivoCancelacion = updateEstadoCitaDto.motivoCancelacion ?? null; 
    } else {
      cita.motivoCancelacion = null;
    }

    return await this.citaRepository.save(cita);
  }

  async reprogramarCita(id: number, reprogramarCitaDto: ReprogramarCitaDto): Promise<Cita> {
    const cita = await this.buscarPorId(id);

    cita.fechaHora = new Date(reprogramarCitaDto.nuevaFechaHora);
    cita.estado = EstadoCita.PENDIENTE;

    return await this.citaRepository.save(cita);
  }

}
