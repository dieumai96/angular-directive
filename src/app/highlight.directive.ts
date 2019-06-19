import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {

  constructor(private el: ElementRef) {
  }
  @Input() highlightColor: string;
  
  @HostListener('mouseenter') onMouseEnter() {

    this.highlight('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  ngOnInit() {
    console.log(this.highlightColor);
    //  this.el.nativeElement.style.backgroundColor = this.highlightColor;

  }


  private highlight(color: string) {
    this.el.nativeElement.style.transition = '0.5s';
    this.el.nativeElement.style.backgroundColor = color;
  }
}