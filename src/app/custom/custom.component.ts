import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable, of, pipe } from 'rxjs';
import { AppService } from '../service/app-service.service';
import { withLatestFrom, map, takeUntil, pairwise, take } from 'rxjs/operators';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.css']
})
export class CustomComponent implements OnInit, OnDestroy {
  clearSub = new Subject<any>()
  buildingInfo: any;
  listEmployee$: Observable<any>;
  listEmployee: any;
  listUser: any;
  isLoading: boolean;
  constructor(
    private appService: AppService
  ) {
    this.isLoading = true;
  }
  array$ = of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  ngOnInit() {
    this.array$.pipe(
      pairwise(),
      take(5),
    ).subscribe(_ => console.log(_));
    this.appService.getBuildingInfo().pipe(
      withLatestFrom(this.appService.getEmploye(), this.appService.getUser()),
      pipe(takeUntil(this.clearSub)),
      map(([buildingInfo, listEmployee, listUser]) => {
        this.buildingInfo = buildingInfo;
        this.listEmployee = listEmployee;
        this.listUser = listUser
      })
    ).subscribe(data => this.isLoading = false)

  }
  ngOnDestroy() {
    this.clearSub.next(true);
    this.clearSub.complete();
  }
}
