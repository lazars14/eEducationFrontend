import { Injectable } from '@angular/core';
import { HttpService, ErrorHandlerService } from '../_core/index';
import { environment } from '../../environments/environment';
import { TeacherTeachesCourse, Teacher } from '../_model/index';

@Injectable()
export class TeacherTeachesCourseService {

  constructor(private httpService: HttpService, private errorHandlerService: ErrorHandlerService) {}

  apiUrl = environment.apiUrl;

  findAll() {
    return this.httpService.get(this.apiUrl + '/teacherTeachesCourse')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findById(id: number) {
    return this.httpService.get(this.apiUrl + '/teacherTeachesCourse/' + id)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  create(ttc: TeacherTeachesCourse) {
    return this.httpService.post(this.apiUrl + '/teacherTeachesCourse/', ttc)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  update(ttc: TeacherTeachesCourse) {
    return this.httpService.put(this.apiUrl + '/teacherTeachesCourse/' + ttc.id, ttc)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  delete(id: number) {
    return this.httpService.delete(this.apiUrl + '/teacherTeachesCourse/' + id)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  batchAdd(teachers: Array<Teacher>, courseId: number) {
    return this.httpService.post(this.apiUrl + '/teacherTeachesCourse/course/' + courseId + '/batchAdd', teachers)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  batchRemove(teachers: Array<Teacher>, courseId: number) {
    return this.httpService.post(this.apiUrl + '/teacherTeachesCourse/course/' + courseId + '/batchRemove', teachers)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

}
