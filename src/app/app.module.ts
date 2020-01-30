import { ServerErrorsInterceptor } from './_shared/server-errors.interceptor';
import { environment } from 'src/environments/environment';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GeneroComponent } from './pages/genero/genero.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GeneroDialogoComponent } from './pages/genero/genero-dialogo/genero-dialogo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';
import { PeliculaEdicionComponent } from './pages/pelicula/pelicula-edicion/pelicula-edicion.component';
import { ComidaComponent } from './pages/comida/comida.component';
import { ComidaDialogoComponent } from './pages/comida/comida-dialogo/comida-dialogo.component';
import { VentaComponent } from './pages/venta/venta.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ConsultaDialogoComponent } from './pages/consulta/consulta-dialogo/consulta-dialogo.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { LoginComponent } from './pages/login/login.component';
import { JwtModule } from "@auth0/angular-jwt";
import { Not403Component } from './pages/not403/not403.component';
import { Not404Component } from './pages/not404/not404.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NuevoComponent } from './pages/login/nuevo/nuevo.component';
import { RolComponent } from './pages/rol/rol.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MenuRolComponent } from './pages/menu-rol/menu-rol.component';
import { MenuRolEdicionComponent } from './pages/menu-rol/menu-rol-edicion/menu-rol-edicion.component';

export function tokenGetter() {
  return sessionStorage.getItem(environment.TOKEN_NAME);
}

@NgModule({
  declarations: [
    AppComponent,
    GeneroComponent,
    GeneroDialogoComponent,
    PeliculaComponent,
    PeliculaEdicionComponent,
    ComidaComponent,
    ComidaDialogoComponent,
    VentaComponent,
    ConsultaComponent,
    ConsultaDialogoComponent,
    ReporteComponent,
    LoginComponent,
    Not403Component,
    Not404Component,
    NuevoComponent,
    RolComponent,
    MenuComponent,
    MenuRolComponent,
    MenuRolEdicionComponent
  ],
  entryComponents: [GeneroDialogoComponent, ComidaDialogoComponent, ConsultaDialogoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:8080"],
        blacklistedRoutes: ["http://localhost:8080/oauth/token"]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
