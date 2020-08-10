import { Component, OnInit } from '@angular/core';
import { BoundElementPropertyAst } from '@angular/compiler';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html'
})
export class ClasesComponent implements OnInit {

  alerta: string = 'alert alert-primary';
  loading: boolean = false;

  propiedades: object = {
    danger: false
  };


  constructor() { }

  ngOnInit() {
  }

  ejecutar() {

    this.loading = true;

    setTimeout(() => {
      this.loading = false;
    }, 3000);

  }

}
