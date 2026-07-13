import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Rol} from "./entities/rol.entity";


@Injectable()
export class RolService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

    async onApplicationBootstrap() {
        const cantidadRoles = await this.rolRepository.count();
        if (cantidadRoles === 0) {
            const rolesIniciales = [
                {id: 1, rol: 'Nutricionista'},
                {id: 2, rol: 'Paciente'},
                {id: 3, rol: 'Administrador'},
            ];
            await this.rolRepository.save(rolesIniciales);

            console.log('Roles iniciales insertados en la base de datos');
        }
    }
}