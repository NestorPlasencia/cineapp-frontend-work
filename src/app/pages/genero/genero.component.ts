import { GeneroDialogoComponent } from './genero-dialogo/genero-dialogo.component';
import { Genero } from './../../_model/genero';
import { GeneroService } from './../../_service/genero.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css']
})
export class GeneroComponent implements OnInit {

  dataSource: MatTableDataSource<Genero>;
  displayedColumns: string[] = ['idGenero', 'nombre', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  cantidad: number = 0;

  constructor(
    private generoService: GeneroService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.generoService.generoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.generoService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });

    /*this.generoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });*/

    this.generoService.listarPageable(0, 10).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.cantidad = data.totalElements;
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filter(x: string) {
    this.dataSource.filter = x.trim().toLowerCase();
  }

  openDialog(genero?: Genero) {
    let gen = genero != null ? genero : new Genero();
    this.dialog.open(GeneroDialogoComponent, {
      width: '250px',
      data: gen
    });
  }

  eliminar(genero: Genero) {
    this.generoService.eliminar(genero.idGenero).subscribe(() => {
      this.generoService.listar().subscribe(data => {
        this.generoService.generoCambio.next(data);
        this.generoService.mensajeCambio.next('SE ELIMINO');
      });
    });
  }

  mostrarMas(e: any) {
    //console.log(e);
    this.generoService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      console.log(data.content);
      this.dataSource = new MatTableDataSource(data.content);
      this.cantidad = data.totalElements;
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }
}
