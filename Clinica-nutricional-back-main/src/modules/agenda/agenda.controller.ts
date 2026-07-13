import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateEstadoCitaDto } from './dto/update-estado-cita.dto';
import { ReprogramarCitaDto } from './dto/reprogramar-cita.dto';
import { AuthGuard } from '../auth/guards/auth/auth.guard';

@Controller('admin/agenda')
@UseGuards(AuthGuard)
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @Post()
  crearCita(@Body() createCitaDto: CreateCitaDto, @Request() req: any) {
    const nutricionistaRut = req.payload.rut
    return this.agendaService.crearCita(createCitaDto, nutricionistaRut);
  }

  @Get('mis-citas')
  obtenerMisCitas(@Request() req: any) {
    const nutricionistaRut = req.payload.rut;
    return this.agendaService.obtenerCitasPorNutricionista(nutricionistaRut);
  }

  @Patch(':id/estado')
  actualizarEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEstadoCitaDto: UpdateEstadoCitaDto,
  ) {
    return this.agendaService.actualizarEstado(id, updateEstadoCitaDto);
  }

  @Patch(':id/reprogramar')
  repogramarCita(
    @Param('id', ParseIntPipe) id:number,
    @Body() reprogramarCitaDto: ReprogramarCitaDto,
  ) {
    return this.agendaService.reprogramarCita(id, reprogramarCitaDto);
  }
}
