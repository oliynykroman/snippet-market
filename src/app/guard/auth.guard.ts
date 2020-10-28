import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router, private localStorage: LocalStorageService) { }
  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (true) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
