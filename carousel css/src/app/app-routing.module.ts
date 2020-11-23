import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';

const routes: Routes = [
  { path: 'carousel', component: CarouselComponent },
  { path: '**', redirectTo: 'carousel', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
