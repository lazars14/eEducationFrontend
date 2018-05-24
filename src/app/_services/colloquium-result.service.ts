import { Injectable } from '@angular/core';
import { HttpService, ErrorHandlerService } from '../_core/index';
import { environment } from '../../environments/environment';
import { ColloquiumResult, Course } from '../_model/index';

@Injectable()
export class ColloquiumResultService {

  constructor(private httpService: HttpService, private errorHandlerService: ErrorHandlerService) {}

  apiUrl = environment.apiUrl;

  findAll(courseId: number) {
    return this.httpService.get(this.apiUrl + '/course/' + courseId + '/colloquiumResults')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findById(courseId: number, resultId: number) {
    return this.httpService.get(this.apiUrl + '/course/' + courseId + '/colloquiumResults/' + resultId)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  create(courseId: number, result: ColloquiumResult) {
    return this.httpService.post(this.apiUrl + '/course/' + courseId + '/colloquiumResults/', result)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  update(courseId: number, result: ColloquiumResult) {
    return this.httpService.put(this.apiUrl + '/course/' + courseId +  '/colloquiumResults/' + result.id, result)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  delete(courseId: number, resultId: number) {
    return this.httpService.delete(this.apiUrl + '/course/' + courseId + '/colloquiumResults/' + resultId)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }
}
