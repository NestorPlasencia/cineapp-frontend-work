import { Pelicula } from './../../../_model/pelicula';
import { Genero } from './../../../_model/genero';
import { GeneroService } from './../../../_service/genero.service';
import { PeliculaService } from './../../../_service/pelicula.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-pelicula-edicion',
  templateUrl: './pelicula-edicion.component.html',
  styleUrls: ['./pelicula-edicion.component.css']
})
export class PeliculaEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  urlImagen: string;
  edicion: boolean;
  generos: Genero[];
  idGeneroSeleccionado: number;

  constructor(
    private peliculaService: PeliculaService,
    private generoService: GeneroService,
    private route: ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'idPelicula': new FormControl(0),
      'nombre': new FormControl(''),
      'resena': new FormControl(''),
      'duracion': new FormControl(0),
      'fechaPublicacion': new FormControl(new Date()),
      'urlPortada': new FormControl(''),
      'genero': new FormControl('')
    });

    this.listarGeneros();

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.initForm();
    });

  }

  initForm() {
    if (this.edicion) {
      this.peliculaService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'idPelicula': new FormControl(data.idPelicula),
          'nombre': new FormControl(data.nombre),
          'resena': new FormControl(data.resena),
          'duracion': new FormControl(data.duracion),
          'fechaPublicacion': new FormControl(new Date()),
          'urlPortada': new FormControl(data.urlPortada),
          'genero': new FormControl(data.genero.idGenero)
        });

        this.urlImagen = this.form.value['urlPortada'];
        this.idGeneroSeleccionado = data.genero.idGenero;
      });
    }
  }

  listarGeneros() {
    this.generoService.listar().subscribe(data => {
      this.generos = data;
    });
  }

  operar() {
    let pelicula = new Pelicula();
    pelicula.idPelicula = this.form.value['idPelicula'];
    pelicula.urlPortada = this.form.value['urlPortada'];
    pelicula.resena = this.form.value['resena'];
    pelicula.nombre = this.form.value['nombre'];
    pelicula.duracion = this.form.value['duracion'];
    let genero = new Genero();
    genero.idGenero = this.idGeneroSeleccionado;
    pelicula.genero = genero;
    /*var tzoffset = (this.form.value['fechaPublicacion']).getTimezoneOffset() * 60000;
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString()*/
    pelicula.fechaPublicacion = moment(this.form.value['fechaPublicacion']).format('YYYY-MM-DDTHH:mm:ss');//localISOTime;

    if (pelicula.idPelicula > 0) {
      this.peliculaService.modificar(pelicula).pipe(switchMap( ()=> {
        return this.peliculaService.listar();
      })).subscribe( data => {
        this.peliculaService.peliculaCambio.next(data);
        this.peliculaService.mensajeCambio.next('SE MODIFICO');
      });

    } else {
      this.peliculaService.registrar(pelicula).subscribe(() => {
        this.peliculaService.listar().subscribe(data => {
          this.peliculaService.peliculaCambio.next(data);
          this.peliculaService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }

    this.router.navigate(['pelicula']);
  }

}
