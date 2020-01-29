import { RolService } from './../../_service/rol.service';
import { Rol } from './../../_model/rol';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  cantidad: number;
  textButton: string = "Añadir";
  rol: Rol;

  dataSource: MatTableDataSource<Rol>;
  displayedColumns = ['idRol', 'nombre', 'descripcion', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private rolService: RolService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.rol = new Rol();

    this.rolService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'INFO', {
        duration: 2000
      });
    });

    this.rolService.rolCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.rolService.listar().subscribe(data => {
      console.log(data)
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filter(x: string) {
    this.dataSource.filter = x.trim().toLowerCase();
  }

  openEdicion(rol?: Rol) {
    if (rol != null) {
      this.rol = rol;
      this.textButton = 'Editar';
    } else {
      this.rol = new Rol();
      this.textButton = 'Añadir';
    }
  }

  eliminar(rol: Rol) {
    this.rolService.eliminar(rol.idRol).subscribe(data => {
      this.rolService.listar().subscribe(roles => {
        this.rolService.rolCambio.next(roles);
        this.rolService.mensajeCambio.next("Se elimino");
      });
    });
  }

  operar() {
    if (this.rol != null && this.rol.idRol > 0) {
      this.rolService.modificar(this.rol).subscribe(data => {
        this.rolService.listar().subscribe(roles => {
          this.rolService.rolCambio.next(roles);
          this.rolService.mensajeCambio.next("Se modifico");
        });
      });
    } else {
      this.rolService.registrar(this.rol).subscribe(data => {
        this.rolService.listar().subscribe(roles => {
          this.rolService.rolCambio.next(roles);
          this.rolService.mensajeCambio.next("Se registro");
        });
      });
    }
  }
}
