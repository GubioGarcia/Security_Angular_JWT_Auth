import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthServiceService } from './auth-service.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = "http://localhost:8080"
  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
    });

    return this.http.post(this.url + "/authenticate", null, { headers, responseType: 'text' });
  }
}
