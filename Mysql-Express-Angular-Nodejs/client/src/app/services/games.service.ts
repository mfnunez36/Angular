import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IJuego } from '../models/game';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GamesService {

  api_uri:String = 'http://localhost:3000/api/games';

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get(`${ this.api_uri }`);
  }

  getById(id: string){
    return this.http.get(`${ this.api_uri }/${id}`);
  }

  agregar(obj: IJuego){
    
    return this.http.post(`${ this.api_uri }`, obj);
  }

  eliminar(id: string){
    return this.http.delete(`${ this.api_uri }/${id}`);
  }

  actualizar(id: string|number, obj: IJuego): Observable<IJuego> {
    return this.http.put(`${ this.api_uri }/${id}`, obj);
  }
}
