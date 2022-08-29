import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroProfileComponent } from '../components/hero-profile/hero-profile.component';
import { ListadoDeHeroesComponent } from '../components/listado-de-heroes/listado-de-heroes.component';
import { ModalPollComponent } from '../components/modal-poll/modal-poll.component';

const routes: Routes = [
  { path: '',
    children: [
      { path: 'listado-heroes', component: ListadoDeHeroesComponent },
      { path: 'heroe/:id', component: HeroProfileComponent },
      { path: 'modal-poll', component: ModalPollComponent },
      { path: '**', redirectTo: 'listado-heroes' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class RutasRoutingModule { }
