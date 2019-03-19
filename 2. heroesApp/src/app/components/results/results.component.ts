import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})

export class ResultsComponent implements OnInit {

  heroes: any = {};

  constructor(private _activatedRoute: ActivatedRoute, private _heroeService: HeroesService) {

  }

  ngOnInit() {    
    this._activatedRoute.params.subscribe(
      params => { this.heroes = this._heroeService.buscarHeroes(params['termino']); }
    );
  }
}
