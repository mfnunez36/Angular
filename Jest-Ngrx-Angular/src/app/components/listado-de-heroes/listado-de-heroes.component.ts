import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ListaHeroesSelector } from '../../state/selectors/heroes.selectors'
import { HeroesService } from '../../services/heroes.service';
import { AppState } from 'src/app/state/app.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listado-de-heroes',
  templateUrl: './listado-de-heroes.component.html',
  styleUrls: ['./listado-de-heroes.component.css']
})
export class ListadoDeHeroesComponent implements OnInit {

  public title = 'Tutorial de Angular - Héroes de Marvel';
  public searchString : string | undefined;
  listheroes$: Observable<any> = new Observable();

  constructor(public heroesService: HeroesService, private router:Router, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.heroesService.getHeroes();
    this.listheroes$ = this.store.select(ListaHeroesSelector);
  }

  submitSearch() {
    this.heroesService.resetPager();
    this.heroesService.getHeroes(this.searchString);
  }

  go_to(id: any){
    this.router.navigateByUrl('rutas/heroe/'+id);
  }

  prevPage() {
    this.heroesService.getHeroes(this.searchString, this.heroesService.page - 1);
  }

  nextPage() {
    this.heroesService.getHeroes(this.searchString, this.heroesService.page + 1);
  }

}

