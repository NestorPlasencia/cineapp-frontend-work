import { MenuService } from './../../_service/menu.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from './../../_service/login.service';
import { Component, OnInit } from '@angular/core';
import '../../login-animation.js';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string;
  clave: string;
  mensaje: string = "";
  error: string = "";

  constructor(
    private loginService: LoginService,
    private menuService: MenuService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  iniciarSesion() {
    this.loginService.login(this.usuario, this.clave).subscribe(data => {      

      sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);
      
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(data.access_token);
      
      this.menuService.listarPorUsuario(decodedToken.user_name).subscribe(data => {
        this.menuService.menuCambio.next(data);
        this.router.navigate(['pelicula']);
      });            
    })
  }

  ngAfterViewInit() {
    (window as any).initialize();
  }
}
