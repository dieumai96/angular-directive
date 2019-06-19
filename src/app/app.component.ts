import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FileSizePipe } from './pipe/fizesize.pipe';
import { AppService } from './service/app-service.service';
import { Observable, fromEvent, of, combineLatest, BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, tap, switchMap, takeUntil, concatMap, } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FileSizePipe]
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  // @ViewChild('searchInput', { static: true }) searchInput: ElementRef; 
  @ViewChild('searchFake', { static: true }) searchFake: ElementRef;
  constructor(private fileSizePipe: FileSizePipe,
    private appService: AppService
  ) {

  }
  title = 'directive';
  listData$: Observable<any>;
  private clearSub = new Subject<any>();
  listRealData: any[] = [];
  mapped: any;
  user = [
    { name: 'Vu Van Thuy' },
    { name: 'Nguyen Van A' },
    { name: 'Nguyen Van B' },
  ]
  isLoading: boolean;
  fileSize = [
    { name: 'background.png', filesize: 2120109 },
    { name: 'united.png', filesize: 18029 },
    { name: 'cf.png', filesize: 1784562 },
  ]
  fakeData = of([
    { name: 'angular' },
    { name: 'angular js' },
    { name: 'angular cs' },
    { name: 'angular ts' },
    { name: 'angular ms' },
    { name: 'angular ks' },
    { name: 'react js' },
    { name: 'react native' },
    { name: 'react ks' },
  ])
  ngOnInit() {
    this.mapped = this.fileSize.map(
      file => {
        return {
          name: file.name,
          filesize: this.fileSizePipe.transform(file.filesize, 'gb'),
        }
      }
    )
    fromEvent(this.searchFake.nativeElement, "keyup").pipe(
      map((event: Event) => (<HTMLInputElement>event.target).value),
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      map(key => key),
      switchMap(value => of(value))
    ).pipe(
      switchMap((data) => {
        let data$: Observable<any>;
        combineLatest(this.fakeData, data).pipe(
          takeUntil(this.clearSub)
        ).subscribe(([fakeData, data]) => {
          let dt = fakeData.filter(x => x.name.indexOf(data) != -1);
          data$ = of(dt);
        })
        return data$;
      })
    ).subscribe(data => console.log(data));
  }
  ngAfterViewInit() {
    // let filter$;
    // fromEvent(this.searchInput.nativeElement, "keyup").pipe(
    //   map((event: Event) => (<HTMLInputElement>event.target).value),
    //   debounceTime(200),
    //   distinctUntilChanged(),
    //   tap(() => this.isLoading = true),
    //   switchMap(value => {
    //     this.listData$ = this.appService.getApi(value);
    //     filter$ = of(value);
    //     combineLatest(this.listData$, filter$).pipe(
    //       takeUntil(this.clearSub)
    //     ).
    //       subscribe(([listData, filter]) => {
    //         this.listRealData = listData.items.filter(x => x.full_name.toLowerCase().indexOf(filter) != -1)
    //       })
    //     return this.appService.getApi(value);
    //   })).subscribe(data => {
    //     this.isLoading = false;
    //   });
  }

  ngOnDestroy() {
    this.clearSub.next(true);
    this.clearSub.complete();
  }
}
