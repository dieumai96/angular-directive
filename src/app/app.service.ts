import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

let search: any = {};
@Injectable()


export class AppService {
    search = new BehaviorSubject(search);
    search$ = this.search.asObservable();
    constructor(
        private http: HttpClient
    ) { }

    getAll(body: any) {
        this.http.post('http://172.104.167.189:5000/api/reflects/reflects4Employee', body, {
            headers: new HttpHeaders().set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZUlEIjoiRW1wbG95ZWVfU1NCXzExIiwidGltZUNyZWF0ZWQiOjE1NTM3NjcyNzg0NDEsImZ1bGxOYW1lIjoiVnUgVmFuIFRodXkiLCJiaXJ0aERhdGUiOjE1NTIzMjM2MDAwMDAsImVtYWlsIjoiYWRAZ21haWwuY29tIiwibm90ZSI6IjIyMmpqamoiLCJyb2xlcyI6WyJBRE1JTiIsIkNTUiIsIlJDTiJdLCJhY2NvdW50VHlwZSI6IkVtcGxveWVlIiwiYnVpbGRpbmdJRCI6IkJ1aWxkaW5nXzMiLCJpYXQiOjE1NTk2NDU2MzQsImV4cCI6MTU2MTgxMDA3OTYzNH0.Et2vT4KxsMPO0Tqp9pwulzK_9wIaYT47L8g8Bk1hYAM')
        })
    }
}