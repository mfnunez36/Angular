import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'rutas',
    loadChildren: () => import('./rutas/rutas.module').then( m => m.RutasModule )
  },
  { path: '**', redirectTo: 'rutas' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
