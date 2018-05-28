import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import { roles } from './constants';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor (private sessionService: SessionService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // if (!this.sessionService.isUserLoggedIn(roles.admin)) {
      //   this.router.navigate(['/']);
      //   return false;
      // }
    return true;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // if (!this.sessionService.isUserLoggedIn(roles.admin)) {
      //   this.router.navigate(['/']);
      //   return false;
      // }
    return true;
  }
}
