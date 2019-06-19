import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { AppService } from '../service/app-service.service';
import { Subject, fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, tap, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  clearSub = new Subject<any>();
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, "keyup").pipe(
      map((event: Event) => (<HTMLInputElement>event.target).value),
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => console.log("Fetch")),
      switchMap(value => {
        return this.appService.getApi(value);
      })).pipe(
        takeUntil(this.clearSub)
      ).subscribe(data => console.log(data));
  }
  ngOnDestroy() {
    this.clearSub.next(true);
    this.clearSub.complete()
  }
}
