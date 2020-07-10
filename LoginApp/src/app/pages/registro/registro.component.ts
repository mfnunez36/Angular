import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioModel } from '../models/usuario.model';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  
  usuarioModel: UsuarioModel;
  recordarUsuario: boolean = false;

  constructor( private auth: AuthService, private router: Router ) { }

  ngOnInit() {
    //instanciamos el modelo para poder utilizarlo en el template
    this.usuarioModel = new UsuarioModel();
  }

  registrarUsuario( form: NgForm ){
    
    if(form.invalid){ return; }

    Swal.fire({ title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();

    this.auth.registro( this.usuarioModel ).subscribe( res => {
      console.log("RESP registro usuario: ", res);
      Swal.close();

      //Recordar usuario
      if( this.recordarUsuario ){
        localStorage.setItem( 'email', this.usuarioModel.email );
      }

      this.router.navigateByUrl('/home');
    }, 
    (err) => {
      console.log("ERROR EN LA CREACION ", err.error.error.message);

      Swal.fire({ title: 'Registro de Usuario',
        text: 'Error: ' + err.error.error.message,
        type: 'error',
        allowOutsideClick: false
      });
    });
  
  }

}
