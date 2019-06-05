import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFontFamily]'
})
export class FontFamilyDirective {

  constructor(
    private el: ElementRef
  ) {
    this.el.nativeElement.style.fontFamily = `'Exo',sans-serif`;
  }
  
}
