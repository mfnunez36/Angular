import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PaisModel } from "../models/pais.model";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class PaisService {
  paisModel: PaisModel;
  constructor(private http: HttpClient) {}
  obtenerPaises() {
    //llamada a la API de paises que hablan en español
    return this.http.get("https://restcountries.eu/rest/v2/lang/es").pipe(
      //map de la extension rxjs/operators
      map((resp: any[]) => {
        //map de javascript para trabajar con arreglos
        return resp.map((pais) => {
          this.paisModel = new PaisModel();
          this.paisModel.nombre = pais.name;
          this.paisModel.alpha3Code = pais.alpha3Code;

          return this.paisModel;
        });
      })
    );
  }
}
