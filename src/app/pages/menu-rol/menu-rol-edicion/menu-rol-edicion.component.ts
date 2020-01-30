import { Menu } from './../../../_model/menu';
import { Rol } from './../../../_model/rol';
import { RolService } from './../../../_service/rol.service';
import { MenuService } from './../../../_service/menu.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-menu-rol-edicion',
    templateUrl: './menu-rol-edicion.component.html',
    styleUrls: ['./menu-rol-edicion.component.css']
})
export class MenuRolEdicionComponent implements OnInit {

    idMenu: number;
    roles: Rol[];
    idRolesSeleccionados: number[];
    menu: Menu = new Menu();
    checked: { [idRol: number]: boolean; } = {};

    constructor(
        private menuService: MenuService,
        private rolService: RolService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.idMenu = params.id;
            this.initForm();
        });
    }

    initForm() {
        this.listarRoles();
        this.menuService.listarPorId(this.idMenu).subscribe(data => {
            this.menu = data;
            this.roles.forEach(rol => {
                this.checked[rol.idRol] = false;
            });
            this.idRolesSeleccionados = data.roles.map(rol => rol.idRol);
            this.idRolesSeleccionados.forEach(idRol => {
                this.checked[idRol] = true;
            });
        });
    }

    listarRoles() {
        this.rolService.listar().subscribe(data => {
            this.roles = data;
        });
    }

    operar() {
        this.roles.forEach(rol => {
            const rolesActivos = this.menu.roles.map(r => r.idRol);
            if (this.checked[rol.idRol]) {
                if (!rolesActivos.includes(rol.idRol)) {
                    this.menu.roles.push(rol);
                }
            } else {
                if ( rolesActivos.includes(rol.idRol)) {
                    this.menu.roles.splice(rolesActivos.indexOf(rol.idRol), 1);
                }
            }
        });
        this.menuService.modificar(this.menu).pipe(switchMap(() => {
            return this.menuService.listar();
        })).subscribe(data => {
            this.menuService.menuCambio.next(data);
            this.menuService.mensajeCambio.next('SE MODIFICO');
        });
        this.router.navigate(['menu_rol']);
    }

}
