import { PartialType } from '@nestjs/swagger';
import { CreateSolicitudExamenDto } from './create-solicitud_examen.dto';

export class UpdateSolicitudExamenDto extends PartialType(CreateSolicitudExamenDto) {

}
