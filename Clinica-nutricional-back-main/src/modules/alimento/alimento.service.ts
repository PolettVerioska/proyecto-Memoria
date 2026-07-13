import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Alimento } from './entities/alimento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlimentoService implements OnModuleInit {
  private readonly logger = new Logger(AlimentoService.name);

  constructor(
    @InjectRepository(Alimento)
    private readonly alimentoRepository: Repository<Alimento>,
  ) {}

  async onModuleInit() {
    const cantidadAlimentos = await this.alimentoRepository.count();

    if (cantidadAlimentos === 0) {
      this.logger.log('No se encontraron alimentos en la base de datos. Iniciando carga de datos...');

      const alimentosPorDefecto = [
        // Frutas y verduras
        { alimento: 'Manzana' },
        { alimento: 'Plátano' },
        { alimento: 'Naranja' },
        { alimento: 'Pera' },
        { alimento: 'Uva' },
        { alimento: 'Frutilla' },
        { alimento: 'Melón' },
        { alimento: 'Sandía' },
        { alimento: 'Piña' },
        { alimento: 'Mango' },
        { alimento: 'Papaya' },
        { alimento: 'Kiwi' },
        { alimento: 'Cereza' },
        { alimento: 'Guinda' },
        { alimento: 'Durazno' },
        { alimento: 'Damasco'},
        { alimento: 'Ciruela' },
        { alimento: 'Frambuesa' },
        { alimento: 'Arándano' },
        { alimento: 'Limón' },
        { alimento: 'Palta' },
        { alimento: 'Tomate' },
        { alimento: 'Zanahoria' },
        { alimento: 'Lechuga' },
        { alimento: 'Espinaca' },
        { alimento: 'Brócoli' },
        { alimento: 'Coliflor' },
        { alimento: 'Pepino' },
        { alimento: 'Berenjena' },
        { alimento: 'Cebolla' },
        { alimento: 'Acelga' },
        { alimento: 'Betarraga' },
        { alimento: 'Nabos' },
        { alimento: 'Ajo' },
        { alimento: 'Pimentón' },
        { alimento: 'Alcachofa' },
        { alimento: 'Papas' },
        { alimento: 'Champiñón' },
        { alimento: 'Calabacín/ Zapallo Italiano' },
        { alimento: 'Zapallo' },
        { alimento: 'Repollo' },
        { alimento: 'Porotos verdes'},
        { alimento: 'Choclo' },
        { alimento: 'Arverjas'},
        { alimento: 'Apio' },
        { alimento: 'Espárrago' },

        // Cereales, legumbres, semillas y frutos secos
        { alimento: 'Arroz' },
        { alimento: 'Trigo' },
        { alimento: 'Avena' },
        { alimento: 'Maíz' },
        { alimento: 'Quinoa' },
        { alimento: 'Porotos'},
        { alimento: 'Lentejas' },
        { alimento: 'Garbanzos' },
        { alimento: 'Habas' },
        { alimento: 'Linaza' },
        { alimento: 'Chía' },
        { alimento: 'Granola' },
        { alimento: 'Nueces' },
        { alimento: 'Almendras' },
        { alimento: 'Avellanas' },
        { alimento: 'Pistachos' },
        { alimento: 'Maní' },
        { alimento: 'Castañas de cajú' },
        { alimento: 'Semillas de girasol' },
        { alimento: 'Semillas de calabaza' },
        { alimento: 'Semillas de sésamo' },


        //Proteínas, Carnes Magras, Pescados y Mariscos
        { alimento: 'Pollo' },
        { alimento: 'Pavo' },
        { alimento: 'Carne de vacuno' },
        { alimento: 'Carne de cerdo' },
        { alimento: 'Carne de cordero' },
        { alimento: 'Carne de conejo' },
        { alimento: 'Huevos' },
        { alimento: 'Mariscal'},
        { alimento: 'Mariscos' },
        { alimento: 'Calamares' },
        { alimento: 'Pulpo' },
        { alimento: 'Mejillones' },
        { alimento: 'Almejas' },
        { alimento: 'Langostinos' },
        { alimento: 'Langosta' },
        { alimento: 'Camarones' },
        { alimento: 'Salmón' },
        { alimento: 'Atún' },
        { alimento: 'Reineta' },
        { alimento: 'Trucha' },
        { alimento: 'Merluza' },
        { alimento: 'Bacalao' },
        { alimento: 'Sardinas' },
        { alimento: 'Anchoas' },
        { alimento: 'Caballa' },
        { alimento: 'Jaiba' },
        { alimento: 'Cangrejo' },
        { alimento: 'Centolla' },
        { alimento: 'Ostiones' },
        { alimento: 'Piure' },
        { alimento: 'Erizos de mar' },
        { alimento: 'Locos' },
        { alimento: 'Choritos' },

        //Lácteos
        { alimento: 'Leche entera' },
        { alimento: 'Leche semidescremada' },
        { alimento: 'Leche descremada' },
        { alimento: 'Leche de soja' },
        { alimento: 'Leche de almendras' },
        { alimento: 'Leche de avena' },
        { alimento: 'Leche de coco' },
        { alimento: 'Leche de arroz' },
        { alimento: 'Yogurt natural' },
        { alimento: 'Yogurt semidescremado' },
        { alimento: 'Yogurt descremado' },
        { alimento: 'Yogurt griego' },
        { alimento: 'Yogurt kefir'},
        { alimento: 'Yogurt de soja' },
        { alimento: 'Queso fresco' },
        { alimento: 'Queso semidescremado' },
        { alimento: 'Queso descremado' },
        { alimento: 'Queso de cabra' },
        { alimento: 'Queso gouda' },
        { alimento: 'Queso mantecoso'},
        { alimento: 'Queso cheddar' },
        { alimento: 'Queso ranco' },
        { alimento: 'Queso azul' },
        { alimento: 'Queso crema' },
        { alimento: 'Queso ricotta' },
        { alimento: 'Queso mozzarella' },
        { alimento: 'Queso parmesano' },

        // Grasas, aceites y aderezos
        { alimento: 'Aceite de oliva' },
        { alimento: 'Aceite de coco' },
        { alimento: 'Aceite de Palta' },
        { alimento: 'Aceite de sésamo' },
        { alimento: 'Aceite de girasol' },
        { alimento: 'Aceite de canola' },
        { alimento: 'Aceite vegetal' },
        { alimento: 'Manteca' },
        { alimento: 'Mantequilla' },
        { alimento: 'Margarina' },
        { alimento: 'Mayonesa' },
        { alimento: 'Mostaza' },
        { alimento: 'Ketchup' },
        { alimento: 'Salsa de soja' },
        { alimento: 'Vinagre' },
        { alimento: 'Aderezo César' },
        { alimento: 'Aderezo de yogurt' },
        { alimento: 'Aderezo de limón' },
        { alimento: 'Aderezo de vinagreta' },

        //Comida rapida y procesada
        { alimento: 'Hamburguesa' },
        { alimento: 'Pizza' },
        { alimento: 'Papas fritas' },
        { alimento: 'Nuggets de pollo' },
        { alimento: 'Salchichas' },
        { alimento: 'Tocino' },
        { alimento: 'Chorizo' },
        { alimento: 'Embutidos' },
        { alimento: 'Comida congelada' },
        { alimento: 'Comida rápida' },

      ];

      await this.alimentoRepository.save(alimentosPorDefecto);
      this.logger.log('Catálogo de alimentos inicializado correctamente.');
    }
  }

    findAll() {
      return this.alimentoRepository.find();
    }

  //public async findAlimentos(): Promise<Alimento[]> {
    //return this.alimentoRepository.createQueryBuilder('alimento').getMany();
  //}
}
