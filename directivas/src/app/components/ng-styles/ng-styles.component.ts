import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-styles',
  template: `
    <!-- Aqui podemos hacer el template html del componente
         con [style.fontSize.px] podemos darle estilo y el px al valor
    -->
    <p [style.fontSize.px]="tamano">
      Hola Mundo esta es una etiqueta
    </p>

    <button class="btn btn-primary" (click)="tamano = tamano + 5">
      <i class="fa fa-plus"></i>
    </button>

    <button class="btn btn-primary" (click)="tamano = tamano - 5">
      <i class="fa fa-minus"></i>
    </button>

  `,
  styles: []
})
export class NgStylesComponent implements OnInit {

  tamano: number = 10;

  constructor() { }

  ngOnInit() {
  }

}
