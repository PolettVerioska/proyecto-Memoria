import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudExamenService } from './solicitud_examen.service';
import { SolicitudExamenController } from './solicitud_examen.controller';
import { SolicitudExamen } from './entities/solicitud_examen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SolicitudExamen])],
  controllers: [SolicitudExamenController],
  providers: [SolicitudExamenService],
})
export class SolicitudExamenModule {}