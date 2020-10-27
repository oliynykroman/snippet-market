import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageMap } from '@ngx-pwa/local-storage';
import { map, first, tap, filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public authToken: string = '';

  constructor(private storage: StorageMap, private router: Router) {

  }

  public saveToken(resp): Observable<string> {
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

  public checkToken() {
   return this.storage.get('access_token').pipe(
      map((data) => {
        if (data !== undefined) {
          return true;
        }
        return false;
      }
      ));
  }
}
