import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendaService } from './agenda.service';
import { AgendaController } from './agenda.controller';
import { Cita } from './entities/cita.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cita, Usuario]), AuthModule],
  controllers: [AgendaController],
  providers: [AgendaService],
})
export class AgendaModule {}