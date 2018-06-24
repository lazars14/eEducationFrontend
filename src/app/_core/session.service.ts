import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { roles } from './constants';

@Injectable()
export class SessionService {

  constructor(private router: Router) { }

  // user = {
  //   token: token
  //   email: email
  //   id: id
  // };

  getUserRole(url: string) {
    if (url.indexOf(roles.admin) === 1) {
      return roles.admin;
    } else if (url.indexOf(roles.teacher) === 1) {
      return roles.teacher;
    } else if (url.indexOf(roles.student) === 1) {
      return roles.student;
    }
  }

  /**
   * Store user email and token in local storage
   */
  storeUser(user: Object) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Check if user is logged in
   */
  isUserLoggedIn() {
    const data = localStorage.getItem('user');
    if (!data) { return null; }
    const session = JSON.parse(data);
    return session && session.token;
  }

  /**
   * Destroy object in local storage
   */
  destroyUser() {
    localStorage.removeItem('user');
  }

  /**
   * Get user session token
   */
  getUserToken() {
    const data = localStorage.getItem('user');
    if (!data) { return null; }
    const user = JSON.parse(data);
    return user.token;
  }

  /**
   * Get logged user email
   */
  getUserEmail() {
    const data = localStorage.getItem('user');
    if (!data) { return null; }
    const user = JSON.parse(data);
    return user.email;
  }

  /**
   * Get logged user id
   */
  getUserId() {
    const data = localStorage.getItem('user');
    if (!data) { return null; }
    const user = JSON.parse(data);
    return user.id;
  }

  /**
   * Set updated user's email
   */
  setUpdatedUserEmail(email: string) {
    const user = JSON.parse(localStorage.getItem('user'));
    user.email = email;
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Set updated user's token
   */
  setUpdatedUserToken(token: string) {
    const user = JSON.parse(localStorage.getItem('user'));
    user.token = token;
    localStorage.setItem('user', JSON.stringify(user));
  }

}
