import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { pipe, of, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  API_ENDPOINT = 'http://172.104.167.189:5000';
  buildingID = 'Building_3';
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZUlEIjoiRW1wbG95ZWVfU1NCXzExIiwidGltZUNyZWF0ZWQiOjE1NTM3NjcyNzg0NDEsImZ1bGxOYW1lIjoiVnUgVmFuIFRodXkiLCJiaXJ0aERhdGUiOjE1NTIzMjM2MDAwMDAsImVtYWlsIjoiYWRAZ21haWwuY29tIiwibm90ZSI6IjIyMmpqamoiLCJyb2xlcyI6WyJBRE1JTiIsIkNTUiIsIlJDTiJdLCJhY2NvdW50VHlwZSI6IkVtcGxveWVlIiwiYnVpbGRpbmdJRCI6IkJ1aWxkaW5nXzMiLCJpYXQiOjE1NjA5Mjg3NzQsImV4cCI6MTU2MzA5NDUwMjc3NH0.xU8uMZQxSFJ70bepomtWCIX5KLO29zhBciD2iAbRk4Y';
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
  getBuildingInfo() {
    let body = {
      buildingID: this.buildingID,
    }
    return this.http.post(`${this.API_ENDPOINT}/api/buildings/buildingInfo`, body, {
      headers: new HttpHeaders().set('Authorization', this.token)
    }).pipe(
      catchError(err => of(err)),
      map((data: any) => data),
    )
  }
  getEmploye() {
    let body = {
      buildingID: this.buildingID,
    }
    return this.http.post(`${this.API_ENDPOINT}/api/buildings/listEmployees`, body, {
      headers: new HttpHeaders().set('Authorization', this.token)
    }).pipe(
      catchError(err => of(err)),
      map((data: any) => data),
    )
  }

  getUser() {
    let body = {
      buildingID: this.buildingID,
    }
    return this.http.post(`${this.API_ENDPOINT}/api/buildings/getAllUser`, body, {
      headers: new HttpHeaders().set('Authorization', this.token)
    }).pipe(
      catchError(err => of(err)),
      map((data: any) => data),
    )
  }
}
