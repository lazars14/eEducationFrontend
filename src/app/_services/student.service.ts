import { Injectable } from '@angular/core';
import { HttpService, ErrorHandlerService } from '../_core/index';
import { environment } from '../../environments/environment';
import { Student } from '../_model/index';

@Injectable()
export class StudentService {

  constructor(private httpService: HttpService, private errorHandlerService: ErrorHandlerService) {}

  apiUrl = environment.apiUrl;

  findAll() {
    return this.httpService.get(this.apiUrl + '/students')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findById(id: number) {
    return this.httpService.get(this.apiUrl + '/students/' + id)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  create(student: Student) {
    return this.httpService.post(this.apiUrl + '/students/', student)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  update(student: Student) {
    return this.httpService.put(this.apiUrl + '/students/' + student.id, student)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  delete(id: number) {
    return this.httpService.delete(this.apiUrl + '/students/' + id)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }
}
