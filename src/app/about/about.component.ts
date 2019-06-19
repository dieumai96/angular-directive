import { Component, OnInit, OnDestroy } from '@angular/core';
import { of, forkJoin, ReplaySubject, Subject } from 'rxjs';
import { map, delay, catchError, tap, switchMap, concatMap, takeUntil } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  // những siêu phẩm với rxjs
  isFinish: boolean = false;
  clearSub = new Subject<any>();
  array = [
    { id: 1, delay: 1500 },
    { id: 2, delay: 3000 },
    { id: 3, delay: 4000 },
    { id: 4, delay: 2500 },
    { id: 5, delay: 1800 },
    { id: 6, delay: 2000 },
  ]
  array1 = [
    { id: 1, delay: 1500 },
    { id: 2, delay: 3000 },
  ]
  array1$ = of(this.array1)
  userMap: { [id: number]: any } = {};
  jobFinishedMap: { [id: number]: boolean } = {};
  array$ = of(this.array);
  baseUrl = 'https://jsonplaceholder.typicode.com/users';
  loadedSub = new ReplaySubject(1);
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    // this.getData();
    this.nextStreamWhenFirstStreamError();
  }
  getData() {
    this.array$.pipe(
      map(val => val.map(value => {
        const { id } = value;
        let url = id === 5 ? `${this.baseUrl}/${id}5` : `${this.baseUrl}/${id}`
        return this.http.get(url).pipe(
          delay(value.delay),
          catchError(err => {
            return of(null);
          }),
          tap((user: any) => {
            if (user) {
              this.userMap[id] = user.name;
              this.loadedSub.next(id);
            }
          })
        )
      })),
      concatMap((value) =>
        forkJoin(...value)
      )
    ).subscribe(_ => {
      this.isFinish = true;
      console.log(_)
    });
    this.loadedSub.asObservable().subscribe((id: number) => {
      if (id == null) {
        this.jobFinishedMap[id] = false;
      } else {
        this.jobFinishedMap[id] = true;
      }
    });
  }

  nextStreamWhenFirstStreamError() {
    let url1 = `${this.baseUrl}/1`;
    let url2 = `${this.baseUrl}/2`;
    this.http.get(url1).pipe(
      takeUntil(this.clearSub),
      catchError(err => {
        return this.http.get(url2)
      }),
      map(data => data),
    ).subscribe(data => console.log(data));
  }
  ngOnDestroy() {
    this.clearSub.next(true);
    this.clearSub.complete()
  }
}
