import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RutasRoutingModule } from './rutas-routing.module';
import { FormsModule } from '@angular/forms';
import { HeroProfileComponent } from '../components/hero-profile/hero-profile.component';
import { ListadoDeHeroesComponent } from '../components/listado-de-heroes/listado-de-heroes.component';
import { ModalPollComponent } from '../components/modal-poll/modal-poll.component';
import { HeroesService } from '../services/heroes.service';

@NgModule({
  declarations: [
    HeroProfileComponent,
    ListadoDeHeroesComponent,
    ModalPollComponent
  ],
  imports: [
    CommonModule,
    RutasRoutingModule,
    FormsModule,
  ],
  providers: [
    HeroesService
  ]
})
export class RutasModule { }
