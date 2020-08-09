import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../../models/usuario.model';
import { from } from 'rxjs';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario: UsuarioModel;
  paises: any[];

  //creamos la propiedad que nos permitira mostrar el valor por defecto del arreglo de paises
  selected: string = "";

  constructor(private paisService: PaisService) { this.usuario = new UsuarioModel(); }

  ngOnInit() {
    //utilizamos el servicio para obtener los paises
    this.paisService.obtenerPaises().subscribe(resp => {
      this.paises = resp;

      //se utiliza unshift({}) para poder agregar un objeto mas al principio del arreglo de paises
      this.paises.unshift({ nombre: 'Seleccione un País', alpha3Code: '' });
    });
  }

  guardar( form: NgForm ){
    if(form.invalid){
      //con Object.values podemos obtener todos los controles del formulario y al recorrerlo
      //marcamos como touched los controles para que al enviar el formulario este realice las validaciones de los campos
      Object.values( form.controls ).forEach( control => {
        control.markAsTouched();
      });

      return;
    }
  }

}
