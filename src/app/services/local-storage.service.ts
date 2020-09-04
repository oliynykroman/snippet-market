import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageMap } from '@ngx-pwa/local-storage';
import { map, first, tap, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public authToken: string = '';
  constructor(private storage: StorageMap, private router: Router) {

    this.storage.get('access_token').pipe(
      filter((authToken) => authToken !== null)
    ).subscribe((authToken: string) => {
      this.authToken = authToken;
    });
  }

  public saveToken(resp): Observable<any> {
    return new Observable((observer) => {
      this.storage.set('access_token', resp.access_token).subscribe((data) => {
        observer.next(data);
        observer.complete();
      },
        (err) => {
          observer.error(err);
          observer.complete();
        }
      );
    });
  }

  public checkToken(): Observable<boolean> {
    return this.storage.get('access_token').pipe(
      map((data) => {
        if (data !== undefined) {
          return true;
        }
        return false;
      }
      ));
  }

  public authTokenF(): string {
    return this.authToken;
  }
}
