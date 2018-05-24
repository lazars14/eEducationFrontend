import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { roles } from './constants';

@Injectable()
export class SessionService {

  constructor(private router: Router) { }

  getUserRole(url: string){
    if(url.indexOf(roles.admin) === 1) {
      return roles.admin;
    } else if(url.indexOf(roles.teacher) === 1) {
      return roles.teacher;
    } else if(url.indexOf(roles.student) === 1) {
      return roles.student;
    }
  }

  /**
   * Store user email and token in local storage
   */
  storeUser(user: Object, userRole: string) {
    localStorage.setItem(userRole, JSON.stringify(user));
  }

  /**
   * Check if user is logged in
   */
  isUserLoggedIn(userRole: string) {
    const data = localStorage.getItem(userRole);
    if (!data) { return null; }
    const session = JSON.parse(data);
    return session && session.token;
  }

  /**
   * Destroy object in local storage
   */
  destroyUser(userRole: string) {
    localStorage.removeItem(userRole);
  }

  /**
   * Get user session token
   */
  getUserToken(userRole: string) {
    const data = localStorage.getItem(userRole);
    if (!data) { return null; }
    const user = JSON.parse(data);
    return user.token;
  }

  /**
   * Get logged user email
   */
  getUserEmail(userRole: string) {
    const data = localStorage.getItem(userRole);
    if (!data) { return null; }
    const user = JSON.parse(data);
    return user.user.email;
  }

  // /**
  //  * Get logged user id
  //  */
  // getUserId(userRole: string) {
  //   const data = localStorage.getItem(userRole);
  //   if (!data) { return null; }
  //   const user = JSON.parse(data);
  //   return user._id;
  // }

  /**
   * Set updated email
   */
  setUpdatedUser(updatedUser: Object, userRole: string) {
    const user = JSON.parse(localStorage.getItem(userRole));
    user.user = updatedUser;
    localStorage.setItem(userRole, JSON.stringify(user));
  }

}