import { createAction, props } from "@ngrx/store";
import { HeroeModel } from "src/app/models/heroe.interface";

export const GETHEROES = '[Heroes] Listar Heroes';

export const GetHeroesAction = createAction(
  GETHEROES, props<{ listHeroes: HeroeModel[] }>()
);
