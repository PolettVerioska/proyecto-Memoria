import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudExamenService } from './solicitud_examen.service';

describe('SolicitudExamenService', () => {
  let service: SolicitudExamenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolicitudExamenService],
    }).compile();

    service = module.get<SolicitudExamenService>(SolicitudExamenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
