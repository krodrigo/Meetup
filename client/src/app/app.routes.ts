import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { ListarMeetupsComponent } from './meetup/listar-meetups/listar-meetups.component';
import { DetalharMeetupComponent } from './meetup/detalhar-meetup/detalhar-meetup.component';
import { IncluirMeetupComponent } from './meetup/incluir-meetup/incluir-meetup.component';
import { EditarMeetupComponent } from './meetup/editar-meetup/editar-meetup.component';
import { ExcluirMeetupComponent } from './meetup/excluir-meetup/excluir-meetup.component';

export const rootRouterConfig: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'meetups', component: ListarMeetupsComponent },
    { path: 'detalhar-meetup/:id', component: DetalharMeetupComponent },
    { path: 'incluir-meetup', component: IncluirMeetupComponent },
    { path: 'editar-meetup/:id', component: EditarMeetupComponent},
    { path: 'excluir-meetup/:id', component: ExcluirMeetupComponent}
];