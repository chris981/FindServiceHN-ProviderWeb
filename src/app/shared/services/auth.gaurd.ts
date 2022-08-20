import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurd implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthService,
    private navigationService: NavigationService
  ) { }

  canActivate() {
    if (this.auth.authenticated) {
      this.navigationService.publishNavigationChange();
      return true;
    } else {
      this.router.navigateByUrl('/sessions/signin');
    }
  }
}
