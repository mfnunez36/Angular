import { createSelector } from "@ngrx/store";
import { HeroeState } from "src/app/models/heroe.interface";
import { AppState } from "../app.state";

export const listHeroesFeature = (state: AppState) => state.listHeroes;

export const ListaHeroesSelector = createSelector(
  listHeroesFeature,
  (state: HeroeState) => state.listHeroes
);
