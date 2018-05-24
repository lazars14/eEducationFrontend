import { Injectable } from '@angular/core';
import { HttpService, ErrorHandlerService } from '../_core/index';
import { environment } from '../../environments/environment';
import { Course } from '../_model/index';

@Injectable()
export class CourseService {

  constructor(private httpService: HttpService, private errorHandlerService: ErrorHandlerService) {}

  apiUrl = environment.apiUrl;

  findAll() {
    return this.httpService.get(this.apiUrl + '/courses')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findById(id: number) {
    return this.httpService.get(this.apiUrl + '/courses/' + id)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  create(course: Course) {
    return this.httpService.post(this.apiUrl + '/courses/', course)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  update(course: Course) {
    return this.httpService.put(this.apiUrl + '/courses/' + course.id, course)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  delete(id: number) {
    return this.httpService.delete(this.apiUrl + '/courses/' + id)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }
}
