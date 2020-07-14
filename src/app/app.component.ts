import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './services/user.service';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public isLogged: boolean = false;
  public subscription: Subscription;
  constructor(private userService: UserService, private router: Router) { }
  ngOnInit() {

    this.checkUserState();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.checkUserState();
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public checkUserState() {
    this.subscription = this.userService.isUserLogged().subscribe((data) => {
      this.isLogged = data;
    });
  }
}
