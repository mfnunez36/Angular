import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { formatRut, RutFormat, validateRut } from '@fdograph/rut-utilities';
import { TransferenciaModel } from "src/app/models/transferencia.model";
import { MinibancoService } from "src/app/services/minibanco.service";
import Swal from 'sweetalert2';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  transferencia: TransferenciaModel;
  transferencias:any[] = [];
  mensajeLista: string;
  select: boolean;

  constructor(private service: MinibancoService, private router: Router) {
    this.transferencia = new TransferenciaModel();
  }

  ngOnInit() {
    this.listarTransferencias();
  }

  logout() {
    this.service.logout();
    this.router.navigateByUrl("/login");
  }

  transferir(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log("FORM ", form);

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Transfiriendo...'
    });
    
    this.service.transferir(this.transferencia).subscribe(resp => {
      Swal.fire({
        allowOutsideClick: false,
        title: 'Transferencias',
        type: 'success',
        text: 'Transferencia Realizada con Exito'
      });

    }, error => {

      Swal.fire({
        allowOutsideClick: false,
        title: 'Error',
        type: 'error',
        text: error.error.message
      });

    });
  }

  listarTransferencias() {
    this.service.listarTransferencias().subscribe((resp: TransferenciaModel) => {
      if(resp.transfersDB.length > 0) {
        this.transferencias.push(resp.transfersDB);
      }else {
        this.mensajeLista = 'No se encontraron Transferencias';
      }
      
    }, error => {
      this.mensajeLista = 'No se encontraron Transferencias';
      console.log("ERROR ", error.error.message);
    })

  }

  // Formatear y validar RUT
  maskRut(destino: any) {
    this.transferencia.destino = formatRut(destino.transferencia.destino, RutFormat.DOTS_DASH);
    
    if(validateRut(this.transferencia.destino)){
      return this.transferencia.destino;
    }
    
    return this.transferencia.destino = null;
    
  }

  setProperty(inChecked: boolean) { 
    this.select = inChecked; 
  }
}
