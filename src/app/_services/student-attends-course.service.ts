import { Injectable } from '@angular/core';
import { HttpService, ErrorHandlerService } from '../_core/index';
import { environment } from '../../environments/environment';
import { StudentAttendsCourse } from '../_model/index';

@Injectable()
export class StudentAttendsCourseService {

  constructor(private httpService: HttpService, private errorHandlerService: ErrorHandlerService) {}

  apiUrl = environment.apiUrl;

  findAll() {
    return this.httpService.get(this.apiUrl + '/studentAttendsCourse')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findById(id: number) {
    return this.httpService.get(this.apiUrl + '/studentAttendsCourse/' + id)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  create(sac: StudentAttendsCourse) {
    return this.httpService.post(this.apiUrl + '/studentAttendsCourse/', sac)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  update(sac: StudentAttendsCourse) {
    return this.httpService.put(this.apiUrl + '/studentAttendsCourse/' + sac.id, sac)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  delete(id: number) {
    return this.httpService.delete(this.apiUrl + '/studentAttendsCourse/' + id)
    .map((res) => res.status)
    .catch(err => this.errorHandlerService.handleError(err));
  }
}
