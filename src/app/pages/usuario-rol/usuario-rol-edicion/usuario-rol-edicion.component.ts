import { Usuario } from './../../../_model/usuario';
import { Rol } from './../../../_model/rol';
import { RolService } from './../../../_service/rol.service';
import { UsuarioService } from './../../../_service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-usuario-rol-edicion',
  templateUrl: './usuario-rol-edicion.component.html',
  styleUrls: ['./usuario-rol-edicion.component.css']
})
export class UsuarioRolEdicionComponent implements OnInit {

  idUsuario: number;
  roles: Rol[];
  idRolesSeleccionados: number[];
  usuario: Usuario = new Usuario();
  checked: { [idRol: number]: boolean; } = {};

  constructor(
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.listarRoles();
  }

  listarRoles() {
    this.rolService.listar().subscribe(data => {
      this.roles = data;
      this.getIdUsuario();
    });
  }

  getIdUsuario() {
    this.route.params.subscribe((params: Params) => {
      this.idUsuario = params.id;
      this.setData();
    });
  }

  setData() {
    this.usuarioService.listarPorId(this.idUsuario).subscribe(data => {
      this.usuario = data;
      console.log(this.roles);
      this.roles.forEach(rol => {
        this.checked[rol.idRol] = false;
      });
      this.idRolesSeleccionados = data.roles.map(rol => rol.idRol);
      console.log(this.idRolesSeleccionados);
      this.idRolesSeleccionados.forEach(idRol => {
        this.checked[idRol] = true;
      });
    });
  }

  operar() {
    this.roles.forEach(rol => {
      const rolesActivos = this.usuario.roles.map(r => r.idRol);
      if (this.checked[rol.idRol]) {
        if (!rolesActivos.includes(rol.idRol)) {
          this.usuario.roles.push(rol);
        }
      } else {
        if (rolesActivos.includes(rol.idRol)) {
          this.usuario.roles.splice(rolesActivos.indexOf(rol.idRol), 1);
        }
      }
    });
    this.usuarioService.modificar(this.usuario).pipe(switchMap(() => {
      return this.usuarioService.listar();
    })).subscribe(data => {
      this.usuarioService.usuarioCambio.next(data);
      this.usuarioService.mensajeCambio.next('SE MODIFICO');
    });
    this.router.navigate(['usuario_rol']);
  }

}
