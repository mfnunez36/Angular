import { createReducer, on } from "@ngrx/store";
import { HeroeState } from "../../models/heroe.interface";
import { GetHeroesAction } from "../actions/heroes.actions";

export const initialState: HeroeState = { listHeroes: [] }

export const heroeReducer = createReducer(
  initialState,// al crear el reducer este recibe el estado inicial
  //con on() ejecutamos una action responde el estado anterior y el final
  on(GetHeroesAction, (state, { listHeroes }) => {
    return { ...state, listHeroes: listHeroes };
  })
);

