import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router, private localStorage: LocalStorageService) { }
  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.localStorage.checkToken().pipe(
      map((token) => {
        if (token) {
          console.log('guard true');
          return true;

        } else {
          this.router.navigate(['/login']);
          console.log('guard false');
          return false;
        }
      })
      , first()
    )
  }
}
