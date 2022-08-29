import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroe } from '../classes/Heroe';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { GetHeroesAction } from '../state/actions/heroes.actions';
import { HeroeModel } from '../models/heroe.interface';

@Injectable({
  providedIn: 'root'
})
// https://gateway.marvel.com:443/v1/public/characters?apikey=56d2cc44b1c84eb7c6c9673565a9eb4b&offset=0&
export class HeroesService {
  private protocol = 'https:';
  private ApiUrl = '//gateway.marvel.com:443/v1/public/';
  public heroes: Array<Heroe> = [];
  public page = 0;
  public step = 20;
  public total = 0;
  public teams = new Map();
  public group_colors = {
    "azul" : "#1f8ff7",
    "violeta":"#a43de3",
    "naranjo":"#df5c0f",
    "verde":"#0ea521"
  }

  constructor(private http: HttpClient, private store: Store<any>) {
  }

  resetPager() {
    return this.page = 0;
  }

  getHeroes (nameStartsWith?: string, page?: number) {
    if (page || page === 0) {
      this.page = page;
    }

    const url = this.protocol + this.ApiUrl + 'characters?apikey=56d2cc44b1c84eb7c6c9673565a9eb4b'
    + '&offset=' + (this.page * this.step)
    + (nameStartsWith ? ('&nameStartsWith=' + nameStartsWith) : '');

    this.http.get(url).subscribe((data: any) => {
      let arr: HeroeModel[] = [];
      this.total = Math.ceil(data.data.total / this.step);

      data.data.results.forEach( (result: HeroeModel) => {
        arr.push(new Heroe(
          result.id,
          result.name,
          result.description,
          result.modified,
          result.thumbnail,
          result.resourceURI,
          this.getTeamColor(result.id)
        ));
      });
      this.store.dispatch(GetHeroesAction({ listHeroes: arr }));

      this.heroes = arr;
    });
  }

  getHeroe(id: number): Observable<Heroe> {
    const url = this.protocol + this.ApiUrl + 'characters/' + id + '?apikey=56d2cc44b1c84eb7c6c9673565a9eb4b';
    return this.http.get<Heroe>(url);
  }

  getTeamColor(id: any) :string {
    if (this.teams.get(id) != undefined) {
      return this.teams.get(id);

    } else {
      return "";
    }
}
}
