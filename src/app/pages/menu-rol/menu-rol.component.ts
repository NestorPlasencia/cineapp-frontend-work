import { MenuService } from './../../_service/menu.service';
import { Menu } from './../../_model/menu';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-menu-rol',
  templateUrl: './menu-rol.component.html',
  styleUrls: ['./menu-rol.component.css']
})
export class MenuRolComponent implements OnInit {

  cantidad: number;
  textButton: string = 'Añadir';
  menu: Menu;

  dataSource: MatTableDataSource<Menu>;
  displayedColumns = ['idMenu', 'nombre', 'url', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private menuService: MenuService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.menu = new Menu();

    this.menuService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'INFO', {
        duration: 2000
      });
    });

    this.menuService.menuCambio.subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.menuService.listarAll().subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filter(x: string) {
    this.dataSource.filter = x.trim().toLowerCase();
  }

  openAsignacion(menu?: Menu) {
    if (menu != null) {
      this.menu = menu;
      this.textButton = 'Editar';
    } else {
      this.menu = new Menu();
      this.textButton = 'Añadir';
    }
  }

  eliminar(menu: Menu) {
    this.menuService.eliminar(menu.idMenu).subscribe(data => {
      this.menuService.listarAll().subscribe(menus => {
        this.menuService.menuCambio.next(menus);
        this.menuService.mensajeCambio.next('Se elimino');
      });
    });
  }

  operar() {
    if (this.menu != null && this.menu.idMenu > 0) {
      this.menuService.modificar(this.menu).subscribe(data => {
        this.menuService.listarAll().subscribe(menus => {
          this.menuService.menuCambio.next(menus);
          this.menuService.mensajeCambio.next('Se modifico');
        });
      });
    } else {
      this.menuService.registrar(this.menu).subscribe(data => {
        this.menuService.listarAll().subscribe(menus => {
          this.menuService.menuCambio.next(menus);
          this.menuService.mensajeCambio.next('Se registro');
        });
      });
    }
  }
}

