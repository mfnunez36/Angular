import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate { 

  constructor( private auth: AuthService, private router: Router ){ }
  
  //implementa CanActivate es una instruccion que se ejecutara cuando se navegue una ruta 
  //para verificar si se puede acceder a esa ruta
  //retorna un Observable<Boolean>

  //canActivate(
    //esto es cual es la siguiente ruta a la cual se quiere ingresar y es opcional
    //next: ActivatedRouteSnapshot,
    //es el estado actual de la ruta y es opcional
    //state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return true;
  //}

  canActivate(): boolean {
    if( this.auth.autenticado() ){
      return true;
    
    }else{
      this.router.navigateByUrl('/login');
      return false;
    }
  }
  
}
