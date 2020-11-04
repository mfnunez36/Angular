import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { validateRut, formatRut, RutFormat } from '@fdograph/rut-utilities';
import { MinibancoService } from 'src/app/services/minibanco.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  messageFailure: string;
  recordarUser: boolean = false;

  constructor(private service: MinibancoService, private router: Router) { 
    this.usuario = new UsuarioModel();
  }

  ngOnInit() {
    // verificamos si ya se ha registrado el usuario
    if(localStorage.getItem('rut')){
      this.usuario.rut = localStorage.getItem('rut');
      this.recordarUser = true;
    }
  }

  login(form: NgForm){
    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Autenticando...'
    });

    Swal.showLoading();

    this.service.login(this.usuario).subscribe(resp => {

      // guardamos el rut de usuario
      if(this.recordarUser){
        localStorage.setItem('rut', this.usuario.rut);
      }

      Swal.close();

      this.router.navigateByUrl('/home');

    }, error => {
      
      Swal.fire({
        allowOutsideClick: false,
        title: 'Error al autenticar',
        type: 'error',
        text: error.error.message
      });

      this.messageFailure = error.error.message;
    });
  }

  // Formatear y validar RUT
  maskRut(rut: any) {
    this.usuario.rut = formatRut(rut.usuario.rut, RutFormat.DOTS_DASH);
    
    if(validateRut(this.usuario.rut)){
      return this.usuario.rut;
    }
    
    return this.usuario.rut = null;
    
  }
}
