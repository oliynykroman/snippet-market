import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, first, switchMap } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
const api = environment;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private storage: StorageMap,
    private router: Router,
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private jwtHelper: JwtHelperService
  ) {
    //
  }

  public login(formData): Observable<any> {
    return this.http.post<any>(`${api.apiAuthDomain}/auth/login`, formData).pipe(
      switchMap((resp) => this.localStorageService.saveToken(resp)),
      tap(() => {
        this.router.navigate(['/profile']);
      }),
      first());
  }

  public logout() {
    this.storage.delete('access_token').pipe(first()).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  public isTokenExpired() {
    const token = this.localStorageService.authTokenF();
    if (this.jwtHelper.isTokenExpired(token)) {
      console.log('not expired');
    } else {
      console.log('expired');
    }
  }
}
