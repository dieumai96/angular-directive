import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe, of, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  complete = new BehaviorSubject(null);
  complete$ = this.complete.asObservable();
  constructor(
    private http: HttpClient
  ) { }

  getApi(params: string) {
    return this.http.get(`https://api.github.com/search/repositories?q=${params}`)
      .pipe(
        map(data => data),
        catchError(err => of(err))
      )
  }
}
