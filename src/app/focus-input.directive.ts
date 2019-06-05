import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appFocusInput]',
})
export class FocusInputDirective implements OnInit{
  @Input('inputText') inputText : string;
  constructor(
    private el : ElementRef
  ) { }
  @HostListener('focus') onMouseEnter() {
    if(!this.inputText){
      this.el.nativeElement.style.paddingTop = '12px';
    }
    // this.highlight(this.highlightColor || 'red');
  }

  @HostListener('blur') onMouseLeave() {
    console.log("ok");
    if(!this.inputText){
      this.el.nativeElement.style.paddingTop = '0px';
    }
    // this.highlight(null);
  }
  ngOnInit(){
    console.log(this.inputText);
    if(this.inputText){
      this.el.nativeElement.style.paddingTop = '12px';

    }else{
      this.el.nativeElement.style.paddingTop = '0px';

    }
  }

  private highlight() {
    this.el.nativeElement.style.paddingTop = '12px';
  }
}
