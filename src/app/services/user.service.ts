import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { LocalStorageService } from './local-storage.service';
import { pipe, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private localStorage: LocalStorageService) { }

  public isUserLogged(): Observable<boolean> {
    return this.localStorage.checkToken();
  }
}
