import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <h3>Cambiar tamaño con ngStyle</h3>
    <app-ng-styles></app-ng-styles>
    <hr><br><br>

    <h3>Estilos dentro del componente</h3>
    <app-css></app-css>
    <hr><br><br>

    <h3>Cambiar Estilos con ngClass</h3>
    <app-clases></app-clases>
    <hr><br><br>

    <h3>Directiva personalizada</h3>
    <p appResaltarElemento>
      Texto cambia de Color por directiva
    </p>
    <hr><br><br>

    <h3>ngSwitch</h3>
    <app-ng-switch></app-ng-switch>
    <hr><br><br>
  `,
  styles: []
})
export class HomeComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  // Ciclo de vida completo de un componente
  constructor() {
    console.log('constructor');
  }

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  ngDoCheck(): void {
    console.log('ngDoCheck');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', changes);
  }
}
