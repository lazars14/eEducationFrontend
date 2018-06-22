import { Injectable } from '@angular/core';
import { HttpService, ErrorHandlerService } from '../_core/index';
import { environment } from '../../environments/environment';
import { Login } from '../_model';

@Injectable()
export class UserService {

  constructor(private httpService: HttpService, private errorHandlerService: ErrorHandlerService) {}

  apiUrl = environment.apiUrl;

  login(email: string, password: string) {
    const login = new Login();
    login.username = email;
    login.password = password;

    return this.httpService.post(this.apiUrl + '/login', login)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  // update() {
  //   return this.httpService.put(this.apiUrl + '/students/' + student.id, student)
  //   .map((res) => res.json())
  //   .catch(err => this.errorHandlerService.handleError(err));
  // }

  // delete(id: number) {
  //   return this.httpService.delete(this.apiUrl + '/students/' + id)
  //   .map((res) => res.status)
  //   .catch(err => this.errorHandlerService.handleError(err));
  // }
  
}
