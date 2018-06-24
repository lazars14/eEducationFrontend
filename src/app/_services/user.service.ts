import { Injectable } from '@angular/core';
import { HttpService, ErrorHandlerService, SessionService } from '../_core/index';
import { environment } from '../../environments/environment';
import { Login } from '../_model';

@Injectable()
export class UserService {

  constructor(private httpService: HttpService, private errorHandlerService: ErrorHandlerService,
    private sessionService: SessionService) {}

  apiUrl = environment.apiUrl;

  login(email: string, password: string) {
    const login = new Login();
    login.username = email;
    login.password = password;

    return this.httpService.post(this.apiUrl + '/login', login)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  logout() {
    return this.httpService.get(this.apiUrl + '/logout')
    .map((res) => res.status)
    .catch(err => this.errorHandlerService.handleError(err));
  }

  // returns token
  changeEmail(oldEmail: string, newEmail: string) {
    return this.httpService.put(this.apiUrl + '/admin/changeEmail',
      {oldEmail: oldEmail, newEmail: newEmail})
    .map((res) => res)
    .catch(err => this.errorHandlerService.handleError(err));
  }

  // returns token
  changePassword(oldPassword: string, newPassword: string, repeatPassword: string) {
    return this.httpService.put(this.apiUrl + '/admin/changePassword/',
      {oldPassword: oldPassword, newPassword: newPassword, repeatPassword: repeatPassword, email: this.sessionService.getUserEmail()})
    .map((res) => res)
    .catch(err => this.errorHandlerService.handleError(err));
  }

}
