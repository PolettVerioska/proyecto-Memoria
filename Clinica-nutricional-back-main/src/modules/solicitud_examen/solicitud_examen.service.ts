import { Injectable, OnModuleInit, Logger, NotFoundException } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, In} from "typeorm";
import {SolicitudExamen} from "./entities/solicitud_examen.entity";
import { Ficha } from '../ficha/entities/ficha.entity';
import { CreateSolicitudExamenDto } from './dto/create-solicitud_examen.dto';

@Injectable()
export class SolicitudExamenService implements OnModuleInit {
  private readonly logger = new Logger(SolicitudExamenService.name);

  constructor(
    @InjectRepository(SolicitudExamen)
    private readonly SolicitudExamenRepository: Repository<SolicitudExamen>,

  ) {}

  async onModuleInit(){
    const cantidadSolicitudExamen = await this.SolicitudExamenRepository.count();

    if(cantidadSolicitudExamen === 0){
      this.logger.log('No se encontró información en la base de datos. Iniciando carga de datos...');

      const SolicitudExamenPorDefecto = [
        // Hematología, Orina y VHS.
        {nombreExamen: 'Perfil Hematológico'},
        {nombreExamen: 'Reticulocitos'},
        {nombreExamen: 'Grupo Sanguíneo y Factor Rh'},
        {nombreExamen: 'Tiempo de Protrombina (TP)'},
        {nombreExamen: 'Tiempo de Tromboplastina Parcial activado (T.T.P.K)'},
        {nombreExamen: 'Velocidad de Sedimentación (VHS)'},
        {nombreExamen: 'Orina Completa'},
        {nombreExamen: 'Orina sedimento'},
        {nombreExamen: 'Proteinuria (indicar aislada o 24 horas)'},
        {nombreExamen: 'Microalbuminuria'},
        {nombreExamen: 'Creatinuria'},
        {nombreExamen: 'RAC (Microalbuminuria/Creatinuria)'},
        {nombreExamen: 'Clearance de Creatinina'},

        //Hormonas 
        {nombreExamen: 'TSH'},
        {nombreExamen: 'T4 Libre'},
        {nombreExamen: 'T4'},
        {nombreExamen: 'Vitamina B12'},
        {nombreExamen: 'Gonadotrofina humana (BHCG) cuantitativo'},
        {nombreExamen: 'Antígeno prostático Total (PSA)'},
        
        //Bioquímica
        {nombreExamen: 'Glicemia'},
        {nombreExamen: 'Tolerancia oral a la glucosa (PTOG)'},
        {nombreExamen: 'Glicemia postprandial'},
        {nombreExamen: 'Hemoglobina glicosilada (HbA1c)'},
        {nombreExamen: 'Creatinina'},
        {nombreExamen: 'Urea/BUN'},
        {nombreExamen: 'Ácido úrico'},
        {nombreExamen: 'Electrolitos plasmaticos (Na, K, Cl)'},
        {nombreExamen: 'Perfil Lipídico (Colesterol total, HDL, LDL, VLDL,Triglicéridos)'},
        {nombreExamen: 'Colesterol total'},
        {nombreExamen: 'Colesterol HDL'},
        {nombreExamen: 'Triglicéridos'},
        {nombreExamen: 'Proteínas totales'},
        {nombreExamen: 'Albúmina'},
        {nombreExamen: 'Calcio'},
        {nombreExamen: 'Fósforo'},
        {nombreExamen: 'Perfil Hepático (GOT, GPT, BT, ALP, GGT, TP)'},
        {nombreExamen: 'Transaminasa oxalacética (GOT/AST)'},
        {nombreExamen: 'Transaminasa pirúvica (GPT/ALT)'},
        {nombreExamen: 'Gamma-glutamintransferasa (GGT)'},
        {nombreExamen: 'Fosfatasa alcalina (ALP)'},
        {nombreExamen: 'Bilirrubina total'},
        {nombreExamen: 'Bilirrubina directa'},
        
        // Inmunología
        {nombreExamen: 'Factor reumatoideo (FR)'},

        //Microbiología
        {nombreExamen: 'Urocultivo'},
        {nombreExamen: 'Cultivo Streptococcus grupo B(Stuart)'},
        {nombreExamen: 'Estudio de flujo vaginal (Tubos SF + Stuart)'},
        {nombreExamen: 'Cultivo corriente (Indicar tipo de muestra)'},
        {nombreExamen: 'Cultivo para Neisseria gonorrhoeae'},
        {nombreExamen: 'Estudio de secreción uretral'},
        {nombreExamen: 'Coprocultivo'},

        //Parasitología
        {nombreExamen: 'Coproparasitológico seriado'},
        {nombreExamen: 'Test de Graham'},
        {nombreExamen: 'Acarotest'},

        //Deposición
        {nombreExamen: 'Helicobacter pylori'},
        {nombreExamen: 'Hemorragia Oculta (Test de Weber)'},
        {nombreExamen: 'Leucocitos fecales'},

        //Serología
        {nombreExamen: 'RPR'},
        {nombreExamen: 'Hepatitis B'},
        {nombreExamen: 'Hepatitis C'},    
        
        //Otros
        {nombreExamen: 'Otro'}
        
      ];

      try {
        await this.SolicitudExamenRepository.insert(SolicitudExamenPorDefecto);
        this.logger.log('Carga de datos completada exitosamente.');
      } catch (error) {
        this.logger.error('Error al cargar los datos por defecto:', error);
      }
    }
  }

    async findAll(): Promise<SolicitudExamen[]> {
      return await this.SolicitudExamenRepository.find();
    }

    async create(createSolicitudExamenDto: CreateSolicitudExamenDto){
      const { fkFicha_id, solicitud_examen_ids } = createSolicitudExamenDto;

      const examenesExistentes = await this.SolicitudExamenRepository.findBy({id: In(solicitud_examen_ids)});

      if(examenesExistentes.length ===0) {
        throw new NotFoundException('Los exámenes solicitados no existen');
      }

      await this.SolicitudExamenRepository.manager.createQueryBuilder().relation(Ficha, 'examenes').of(fkFicha_id).add(examenesExistentes.map(examen => examen.id));

      return {
        mensaje: 'Solicitud de examen creada exitosamente',
        cantidadExamenes: examenesExistentes.length,
      };
    }



    findOne(id: number) {
      return `This action returns a #${id} solicitudExamen`;
    }

  }

