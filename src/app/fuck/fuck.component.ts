import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-fuck',
  templateUrl: './fuck.component.html',
  styleUrls: ['./fuck.component.css'],
  changeDetection : ChangeDetectionStrategy.Default
})
export class FuckComponent implements OnInit , OnChanges {
  @Input('data') data: string;
  constructor(

  ) { }

  ngOnInit() {
    console.log(this.data);
  }

  ngOnChanges(){
    console.log("vao day nay");
  }

}
