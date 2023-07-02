import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { map } from "rxjs/operators"; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) {
  }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}/users`, userObj);
  }

  getUserImage(imgId: number) {
    return this.http.get<any>(`${this.baseUrl}/photos/${imgId}`).pipe(map(res => res));
  }
  
}