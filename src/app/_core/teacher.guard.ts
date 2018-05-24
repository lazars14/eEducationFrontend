import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from './index';
import { roles } from './constants';

@Injectable({
  providedIn: 'root'
})
export class TeacherGuard implements CanActivate, CanActivateChild {

  constructor (private sessionService: SessionService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // if (!this.sessionService.isUserLoggedIn(roles.teacher)) {
      //   this.router.navigate(['/']);
      //   return false;
      // }
    return true;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // if (!this.sessionService.isUserLoggedIn(roles.teacher)) {
      //   this.router.navigate(['/']);
      //   return false;
      // }
    return true;
  }
}
