import { Component } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html'
})

export class HeroesComponent {

  private heroes: any[];
  
  constructor(private _heroesService:HeroesService, private _router:Router ) {
    this.heroes = _heroesService.getHeroes();
  }

  verHeroe(id: number) {
    this._router.navigate(['/heroe', id]);
  }
}
