import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../pages/models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:sign';
  private apiKey = 'AIzaSyCIxJ3i8PNEbC8F_u-Xz-_Y7tN7_bJLh4o';
  userToken: string;

  constructor(private http: HttpClient) { }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpire');
  }


  login( usuarioModel: UsuarioModel ){

    const authData = {
      ...usuarioModel,
      returnSecureToken: true
    }

    //retornamos el servicio post ya que lo utilizaremos
    //desde el componente Login
    return this.http.post(
      `${ this.url }InWithPassword?key=${ this.apiKey }`,
      authData
    ).pipe(
      //con el pipe podemos obtener datos que no utilizamos
      //si la respuesta del post es un error, el map jamas se ejecutara
      map( resp => {
        this.guardarToken( resp['idToken'] ); //idToken proviene de la respuesta de firebase
        return resp;
      })
    );

  }

  registro( usuarioModel: UsuarioModel ){
    //forma comun de mapear data
    // const authData = {
    //   email: usuarioModel.email,
    //   password: usuarioModel.password,
    //   returnSecureToken: true
    // }

    //mapear con spread ...
    const authData = {
      ...usuarioModel,
      returnSecureToken: true
    }

    //retornamos el servicio post ya que lo utilizaremos
    //desde el componente Login
    return this.http.post(
      `${ this.url }Up?key=${ this.apiKey }`,
      authData
    ).pipe(
      //con el pipe podemos obtener datos que no utilizamos
      //si la respuesta del post es un error, el map jamas se ejecutara
      map( resp => {
        this.guardarToken( resp['idToken'] ); //idToken proviene de la respuesta de firebase
        return resp;
      })
    );
  }


  //grabar token en localstorage
  private guardarToken( token: string ){
    let today = new Date();
    today.setSeconds( 3600 ); //firebase siempre devuelve 3600 milisegundos de expiracion para token

    this.userToken = token;
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'tokenExpire', today.getTime().toString() );
  }

  obtenerToken(){
    if( localStorage.getItem('token') ){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = "";
    }
  }

  //Si existe token es porque esta autenticado
  autenticado(): boolean{
    if(!this.userToken){
      return false;
    }
    return true;
  }


}
