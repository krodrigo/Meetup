import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";

import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuNavegacaoComponent } from './navigation/menu-navegacao/menu-navegacao.component';
import { FooterComponent } from './navigation/footer/footer.component';

import { MeetupService } from './meetup/services/meetup.service';

import { rootRouterConfig } from './app.routes';
import { ListarMeetupsComponent } from './meetup/listar-meetups/listar-meetups.component';
import { DetalharMeetupComponent } from './meetup/detalhar-meetup/detalhar-meetup.component';
import { IncluirMeetupComponent } from './meetup/incluir-meetup/incluir-meetup.component';
import { EditarMeetupComponent } from './meetup/editar-meetup/editar-meetup.component';
import { ExcluirMeetupComponent } from './meetup/excluir-meetup/excluir-meetup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuNavegacaoComponent,
    FooterComponent,
    ListarMeetupsComponent,
    DetalharMeetupComponent,
    IncluirMeetupComponent,
    EditarMeetupComponent,
    ExcluirMeetupComponent    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    RouterModule.forRoot(rootRouterConfig, {useHash: false})
  ],
  providers: [
    MeetupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
