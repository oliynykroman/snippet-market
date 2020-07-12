import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Injectable } from '@angular/core';
const api = environment;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storage: StorageMap, private router: Router, private http: HttpClient) { }
  // apiDomain


  public isAuthentificated(): boolean {
    const token = localStorage.getItem('token');
    //check token expire
    return true;
  }

  public login(formData: User): any {
    this.http.post(`${api.apiDomain}/login`, formData).subscribe({
      next: (resp: any) => {
        this.storage.set('access_token', resp.access_token).subscribe({
          next: () => {
            // this.router.navigate([url]);
          },
          error: (error) => {
            console.log(error);
          }
        });
      },
      error: (error) => {
        return error;
      }

      // this.storage.set('access_token', resp.access_token).subscribe({
      //   next: () => {
      //     this.router.navigate([url]);
      //   },
      //   error: (error) => {
      //     console.log(error);
      //   }
      // });
    });
  }
  public logout() {
    localStorage.removeItem('token');
  }

  public logIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }

}
