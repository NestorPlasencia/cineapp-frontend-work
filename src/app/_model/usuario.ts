import { Cliente } from './cliente';
import { Rol } from './rol';
export class Usuario {
    idUsuario: number;
    cliente: Cliente;
    nombre: string;
    clave: string;
    estado: boolean;
    roles: Rol[];
}