export interface HeroeModel {
  id: string;
  name: string;
  description: string;
  modified: Date;
  thumbnail: Object;
  resourceURI: string;
  teamColor: string
}

export interface HeroeState {
  listHeroes: ReadonlyArray<HeroeModel>;
}
