import { GeneroService } from './../../../_service/genero.service';
import { Genero } from './../../../_model/genero';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-genero-dialogo',
  templateUrl: './genero-dialogo.component.html',
  styleUrls: ['./genero-dialogo.component.css']
})
export class GeneroDialogoComponent implements OnInit {

  genero: Genero;

  constructor(
    private dialogRef: MatDialogRef<GeneroDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Genero,
    private generoService: GeneroService) { }

  ngOnInit() {
    this.genero = new Genero();
    this.genero.idGenero = this.data.idGenero;
    this.genero.nombre = this.data.nombre;
  }

  operar() {
    if (this.genero.idGenero > 0) {
      this.generoService.modificar(this.genero).subscribe(() => {
        this.generoService.listar().subscribe(data => {
          this.generoService.generoCambio.next(data);
          this.generoService.mensajeCambio.next('SE MODIFICO');
        });
      });
    } else {
      this.generoService.registrar(this.genero).subscribe(() => {
        this.generoService.listar().subscribe(data => {
          this.generoService.generoCambio.next(data);
          this.generoService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }
    this.dialogRef.close();
  }

  cancelar() {
    this.dialogRef.close();
  } 
}
