import { ActionReducerMap } from '@ngrx/store';
import { HeroeState } from '../models/heroe.interface';
import { heroeReducer } from './reducers/heroes.reducer';

export interface AppState {
  listHeroes: HeroeState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  listHeroes: heroeReducer
}
