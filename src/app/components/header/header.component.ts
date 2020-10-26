import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isUserLogged$: Observable<boolean>;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
    //
  }

  ngOnInit(): void {
    this.isUserLogged$ = this.userService.isUserLogged();
  }
  public logout() {
    this.authService.logout();
  }

}
