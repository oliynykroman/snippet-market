import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable, Subscription, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { User, UserData } from '../models/user.model';


const api = environment;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

  public getUser() {
    const token = this.localStorage.getTokenData();
    return jwt_decode(token);
  }

  public getUserData() {
    return this.http.get<UserData>(`${api.userDataDomain}/users/${this.getUser().userId}`);
  }
  public getGitData(name) {
    return this.http.get<UserData>(`https://api.github.com/users/${name}`);
  }
}
