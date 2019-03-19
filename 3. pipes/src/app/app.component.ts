import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  nombre = 'Fernando';
  nombre2 = "Max Fuentes Nuñez"
  arreglo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  PI = Math.PI;
  a: number = 0.234;
  salario = 500000;

  heroe = {
    nombre: "Logan",
    clave: "wolverine",
    edad: 500,
    direccion: {
      calle: "Las Golondrinas",
      casa: 20
    },
    grupo: "X-Men"
  };

  valorPromesa = new Promise((resolve, reject) => {

    setTimeout(() => resolve('llego la data'), 3500);

  });

  fecha = new Date();
  clavevideo: string  = "z-MxwpHNMSo";
  activar: boolean = true;
}
