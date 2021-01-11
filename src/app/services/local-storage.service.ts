import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageMap } from '@ngx-pwa/local-storage';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public authToken;

  constructor(private storage: StorageMap, private router: Router) {
    this.checkToken();
  }
  /**
   * Save token in local storage
   * @param resp
   */
  public saveToken(token): Observable<string> {
    return new Observable((observer) => {
      this.storage.set('access_token', token.access_token).subscribe((data) => {
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

  /**
   * Check token ixist in local storage
   */
  public checkToken() {
    return this.storage.watch('access_token').pipe(
      map((data) => {
        this.authToken = data;
        if (data !== undefined) {
          return true;
        }
        return false
      }))
  }

  public getTokenData() {
    return this.authToken;
  }
}
