import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SolicitudExamenService } from './solicitud_examen.service';
import { CreateSolicitudExamenDto } from './dto/create-solicitud_examen.dto';


@Controller('solicitud_examen')
export class SolicitudExamenController {
  constructor(private readonly solicitudExamenService: SolicitudExamenService) {}

  //Cuando se realice la petición GET a la ruta /solicitud-examen, se ejecutará el método findAll() del servicio SolicitudExamenService para obtener todos los registros de solicitud de examen.
  @Get()
  findAll() {
    return this.solicitudExamenService.findAll();
  }

  @Post()
  create(@Body() createSolicitudExamenDto: CreateSolicitudExamenDto) {
    return this.solicitudExamenService.create(createSolicitudExamenDto);
  }
}
