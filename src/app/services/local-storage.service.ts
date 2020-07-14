import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageMap } from '@ngx-pwa/local-storage';
import { map, first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private storage: StorageMap, private router: Router) { }

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
}
