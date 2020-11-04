import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { MinibancoService } from '../services/minibanco.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private service: MinibancoService, private router: Router ){

  }

  canActivate(): boolean {
    if( this.service.autenticado()){
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
  
}
