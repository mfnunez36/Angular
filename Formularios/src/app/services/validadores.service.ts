import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface IErrorValidate {
  [s: string]: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  validaPassword(control: FormControl): {[ s: string ]: boolean} {

    if ( control.value.length <= 5) {
      return {
        passwordInvalid: true
      };
    }

    return null;
  }

  validaEmails(control: FormControl): {[ s: string ]: boolean} {
    const regexEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;

    if ( regexEmail.test(control.value) ) {
      return {
        emailinvalid: true
      };
    }

    return null;
  }

  validaPasswordsIguales(pass: string, pass2: string) {

    return (formGroup: FormGroup) => {

      const pass1ctrl = formGroup.controls[pass];
      const pass2ctrl = formGroup.controls[pass2];

      if ( pass1ctrl === pass2ctrl ) {

      } else {
        pass2ctrl.setErrors({ noEsIgual: true });
      }
    };
  }

  existeUser(): Promise<IErrorValidate> | Observable<IErrorValidate> {
    return new Promise( (resolve, reject) => {

      setTimeout( () => {
        if () {

        }
      }, 3000);
    });
  }

}
