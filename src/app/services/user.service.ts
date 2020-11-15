import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';
import { UserData, UserFullInfo, UserGitData } from '../models/user.model';
import { concatMap, map } from 'rxjs/operators';


const api = environment;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {

  }

  public getUser() {
    const token = this.localStorage.getTokenData();
    return jwt_decode(token);
  }

  public getUserData() {
    return this.http.get<UserData>(`users/${this.getUser().userId}`).pipe(
      concatMap(
        serverData =>
          <Observable<UserFullInfo>>(
            this.http.get<UserGitData>(`${api.apiGitDomain}users/${serverData.gitProfile}`)
              .pipe(
                map(gitData => ({
                  userServer: serverData,
                  userGit: gitData
                })
                )
              )
          )
      )
    )
  }

  public saveUserData(data: UserData) {
    return this.http.patch<UserData>(`users/${this.getUser().userId}`, data);
  }
}
