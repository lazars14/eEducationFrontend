import { Injectable } from '@angular/core';
import { HttpService, ErrorHandlerService, SessionService } from '../_core/index';
import { environment } from '../../environments/environment';
import { Grade } from '../_model/index';

@Injectable()
export class GradeService {

  constructor(private httpService: HttpService, private errorHandlerService: ErrorHandlerService, 
    private sessionService: SessionService) {}

  apiUrl = environment.apiUrl;

  findAll() {
    return this.httpService.get(this.apiUrl + '/grades')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findById(id: number) {
    return this.httpService.get(this.apiUrl + '/grades/' + id)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  create(grade: Grade) {
    return this.httpService.post(this.apiUrl + '/grades/', grade)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  update(grade: Grade) {
    return this.httpService.put(this.apiUrl + '/grades/' + grade.id, grade)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  delete(id: number) {
    return this.httpService.delete(this.apiUrl + '/grades/' + id)
    .map((res) => res.status)
    .catch(err => this.errorHandlerService.handleError(err));
  }

  getByStudent() {
    return this.httpService.get(this.apiUrl + '/grades/students/' + this.sessionService.getUserId())
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }
}
