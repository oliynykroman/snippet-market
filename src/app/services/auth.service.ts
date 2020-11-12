import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, first, switchMap } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private storage: StorageMap,
    private router: Router,
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    //
  }

  /**
   * Registration method
   * @param formData 
   */
  public registration(formData): Observable<any> {
    return this.http.post<any>(`auth/register`, formData);
  }


  /**
   * login method
   * @param formData 
   */
  public login(formData): Observable<any> {
    return this.http.post<any>(`auth/login`, formData).pipe(
      switchMap((token) => this.localStorageService.saveToken(token)),
      tap(() => {
        this.router.navigate(['/profile']);
      }),
      first());
  }

  /**
   * Logout method
   */
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
}
