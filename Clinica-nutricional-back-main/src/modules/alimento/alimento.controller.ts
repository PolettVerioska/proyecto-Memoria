import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AlimentoService } from './alimento.service';

@Controller('alimento')
export class AlimentoController {
  constructor(private readonly alimentoService: AlimentoService) {}

  @Get()
  findAll() {
    return this.alimentoService.findAll();
  }
  
}
