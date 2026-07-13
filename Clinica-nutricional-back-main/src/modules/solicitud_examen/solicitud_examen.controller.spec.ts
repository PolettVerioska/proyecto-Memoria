import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudExamenController } from './solicitud_examen.controller';
import { SolicitudExamenService } from './solicitud_examen.service';

describe('SolicitudExamenController', () => {
  let controller: SolicitudExamenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolicitudExamenController],
      providers: [SolicitudExamenService],
    }).compile();

    controller = module.get<SolicitudExamenController>(SolicitudExamenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
