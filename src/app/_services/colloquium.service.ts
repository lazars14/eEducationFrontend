import { Injectable } from '@angular/core';
import { HttpService, ErrorHandlerService } from '../_core/index';
import { environment } from '../../environments/environment';
import { Colloquium, Course } from '../_model/index';

@Injectable()
export class ColloquiumService {

  constructor(private httpService: HttpService, private errorHandlerService: ErrorHandlerService) {}

  apiUrl = environment.apiUrl;

  findAll(courseId: number) {
    return this.httpService.get(this.apiUrl + '/course/' + courseId + '/colloquiums')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findById(courseId: number, colloquiumId: number) {
    return this.httpService.get(this.apiUrl + '/course/' + courseId + '/colloquiums/' + colloquiumId)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  create(courseId: number, colloquium: Colloquium) {
    return this.httpService.post(this.apiUrl + '/course/' + courseId + '/colloquiums/', colloquium)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  update(courseId: number, colloquium: Colloquium) {
    return this.httpService.put(this.apiUrl + '/course/' + courseId +  '/colloquiums/' + colloquium.id, colloquium)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  delete(courseId: number, colloquiumId: number) {
    return this.httpService.delete(this.apiUrl + '/course/' + courseId + '/colloquiums/' + colloquiumId)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  getByCourse(courseId: number) {
    return this.httpService.get(this.apiUrl + '/course/' + courseId + '/colloquiums/byCourse')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }
}
