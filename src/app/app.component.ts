import { Component, ChangeDetectionStrategy, OnChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // changeDetection : ChangeDetectionStrategy.Default
})
export class AppComponent  implements OnChanges{
  title = 'directive';
  color: string = "red";
  searchTen: string = 'dkm'
  searchTitle: string;
  dataToFuckComponent: string = "ABC dat de di ia ";
  ngOnChanges(){
    console.log("here");
  }
}
