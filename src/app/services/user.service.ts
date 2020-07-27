import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

const api = environment;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private localStorage: LocalStorageService, private http: HttpClient, private router: Router) { }

  public isUserLogged(): Observable<boolean> {
    return this.localStorage.checkToken();
  }

  public registration(formData): Observable<any> {
    return this.http.post<any>(`${api.apiDomain}/auth/register`, formData);
  }

  public getUser() {
    const token = this.localStorage.authTokenF();
    var decoded = jwt_decode(token);
    console.log(decoded['userId']);
  }
}
