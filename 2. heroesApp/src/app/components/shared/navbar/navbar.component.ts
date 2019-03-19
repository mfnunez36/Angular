import { Component } from '@angular/core';
import { HeroesService } from '../../../services/heroes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  constructor(private _heroesServices: HeroesService, private _router: Router) {

  }

  buscarHeroes(termino: string) {
    this._router.navigate(['/results', termino]);
  }

}
