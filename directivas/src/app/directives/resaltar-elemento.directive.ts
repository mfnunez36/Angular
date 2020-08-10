import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appResaltarElemento]'
})
export class ResaltarElementoDirective {

  @Input('appResaltarElemento') nuevoColor: string;

  constructor(private elementRef: ElementRef) {
    // this.elementRef.nativeElement.style.backgroundColor = 'red';
  }

  @HostListener('mouseenter') mouseInHover() {
    this.elementRef.nativeElement.style.backgroundColor = 'red';
  }

  @HostListener('mouseleave') mouseOutHover() {
    this.elementRef.nativeElement.style.backgroundColor = null;
  }

}
