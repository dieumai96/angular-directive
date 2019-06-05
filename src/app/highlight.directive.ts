import { Directive, ElementRef, HostListener, Input, OnInit, OnChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit , OnChanges{
  constructor(private el: ElementRef) {
  }
  @Input() highlightColor: string;
  @HostListener('mouseenter') onMouseEnter() {

    this.highlight(this.highlightColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }
  ngOnChanges(){
    console.log("directive change");
  }
  ngOnInit() {
    console.log(this.highlightColor);
     this.el.nativeElement.style.backgroundColor = this.highlightColor;

  }


  private highlight(color: string) {
    this.el.nativeElement.style.transition = '0.5s';
    this.el.nativeElement.style.backgroundColor = color;
  }
}