import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TransferenciaModel } from '../models/transferencia.model';

@Injectable({
  providedIn: 'root'
})
export class MinibancoService {

  // URL API 
  private api = "https://max-minibanco.herokuapp.com";
  token: string;
  helper: JwtHelperService;

  // Listar Transferencias Realizadas 
  // recibe id por body
  // /api/transferencias/id

  constructor(private http: HttpClient) { 
    this.helper = new JwtHelperService();
  }


  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }


  login(usuario: UsuarioModel){
    const data = {
      ...usuario
    }

    // utilizamos map para poder acceder a la data antes de que retorne
    return this.http.post(`${ this.api }/api/login`, data)
    .pipe( map(resp => {
      
      this.guardarData( resp );

      // se debe retornar la respuesta ya que se bloquea el callback con el return anterior
      return resp;
    }, error => { 
      
      console.log("ERROR EN LOGIN ", error ); 
      return;
    }));
  }

  autenticado(): boolean {
    this.token = localStorage.getItem('token');
    // verificamos que el token no este expirado
    if( this.token.length < 2 || this.token === undefined || this.helper.isTokenExpired(this.token) ) {
      return false;
    }

    return true;
  }

  registrarUsuario(usuario: UsuarioModel){
    const data = {
      ...usuario
    }

    return this.http.post(`${ this.api }/api/usuario`, data);
  }


  private guardarData(data: any){
    let usuario = data.usuario;
    localStorage.setItem('token', data.token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  leerToken(){

    if (localStorage.getItem('token')) {
      
      this.token = localStorage.getItem('token');

    } else {

      this.token = '';
    }

    return this.token;

  }


  transferir(transferencia: TransferenciaModel){
    const data = {
      origen: JSON.parse(localStorage.getItem('usuario')),
      destino: transferencia.destino,
      monto: transferencia.monto,
      tipo: transferencia.tipo
    }
    data.origen = data.origen.rut

    console.log("DATA TRANSFER", data.origen);

    return this.http.post(`${ this.api }/api/transferir`, data, { headers: { token: this.token } });

  }

  listarTransferencias(){
    const data = {  
      token: localStorage.getItem('token'),
      usuario: JSON.parse(localStorage.getItem('usuario'))
    }

    console.log("DATA LISTA", data);

    return this.http.get(`${ this.api }/api/transferencias/${ data.usuario._id }`, { headers: { token: data.token } });
  }

}
