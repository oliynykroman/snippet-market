import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable, Subscription, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { UserData } from '../models/user.model';


const api = environment;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private localStorageService: LocalStorageService, private http: HttpClient, private router: Router) { }


  public isUserLogged(): Observable<boolean> {
    return this.localStorageService.checkToken();
  }

  public registration(formData): Observable<any> {
    return this.http.post<any>(`${api.apiAuthDomain}/auth/register`, formData);
  }

  public getUser() {
    const token = this.localStorageService.authTokenF();
    var decoded = jwt_decode(token);

    return decoded.userId;
  }

  public getUserInfo(userId) {
    return this.http.get<UserData>(`${api.userDataDomain}/users/${userId}`);
  }
  public getGitData(name) {
    return this.http.get<UserData>(`https://api.github.com/users/${name}`);
  }
}
