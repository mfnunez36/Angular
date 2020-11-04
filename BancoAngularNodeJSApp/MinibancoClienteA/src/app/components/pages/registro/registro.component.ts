import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { UsuarioModel } from "src/app/models/usuario.model";
import { validateRut, formatRut, RutFormat } from '@fdograph/rut-utilities';
import { MinibancoService } from 'src/app/services/minibanco.service';
import Swal from 'sweetalert2';


@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html"
})
export class RegistroComponent implements OnInit {
  
  usuario: UsuarioModel;
  messageFailure: string;
  recordarUser: boolean = false;

  constructor(
    private service: MinibancoService, 
    private router: Router
    ) { 

  }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  // Registrar Usuario
  registrar(form: NgForm) {
    if (form.invalid) {
      return;
    }

    // crear Modal sweetAlert
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Registrando...'
    });

    // mostrar loading sweetAlert
    Swal.showLoading();

    this.service.registrarUsuario(this.usuario)
    .subscribe( (resp) => {
      console.log("Usuario Creado correctamente", resp);
      
      // cerrar Modal sweetAlert
      Swal.close();

      // guardamos el rut de usuario
      if(this.recordarUser){
        localStorage.setItem('rut', this.usuario.rut);
      }

      this.router.navigateByUrl('/login');
      
    }, error => {
      
      // crear para error Modal sweetAlert
      Swal.fire({
        allowOutsideClick: false,
        title: 'Error al registrar el usuario',
        type: 'error',
        text: 'El usuario ya existe.'
      });

      this.messageFailure = 'El usuario ya existe.';
      this.limpiarImputs();
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

  limpiarImputs(){
    this.usuario = new UsuarioModel();
  }
}
