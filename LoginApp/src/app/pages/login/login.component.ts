import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioModel: UsuarioModel;
  recordarUsuario: boolean = false;

  constructor(private auth: AuthService, private router: Router ) { }

  ngOnInit() {
    //instanciamos el modelo para poder utilizarlo en el template
    this.usuarioModel = new UsuarioModel();

    //si hay usuario recordado
    if( localStorage.getItem('email') ){
      this.usuarioModel.email = localStorage.getItem('email');
      this.recordarUsuario = true;
    }
  }

  login( form: NgForm ){

    if( form.invalid ){ return; }

    Swal.fire({ title: 'Espere',
      text: 'Autenticando',
      type: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();


    this.auth.login( this.usuarioModel )
    .subscribe(res => {
      console.log("Usuario Logeado");
      Swal.close();

      //Recordar usuario
      if( this.recordarUsuario ){
        localStorage.setItem( 'email', this.usuarioModel.email );
      }

      this.router.navigateByUrl('/home');
    },
    (err) => {
      console.log("Error en Authentication: ", err.error.error.message);
      Swal.fire({ title: 'Autenticación',
        text: 'Error: ' + err.error.error.message,
        type: 'error',
        allowOutsideClick: false
      });
    });

  }
}
