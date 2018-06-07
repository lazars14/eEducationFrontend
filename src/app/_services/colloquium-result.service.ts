import { Injectable } from '@angular/core';
import { HttpService, ErrorHandlerService } from '../_core/index';
import { environment } from '../../environments/environment';
import { ColloquiumResult, Course } from '../_model/index';

@Injectable()
export class ColloquiumResultService {

  constructor(private httpService: HttpService, private errorHandlerService: ErrorHandlerService) {}

  apiUrl = environment.apiUrl;

  findAll(colloquiumId: number) {
    return this.httpService.get(this.apiUrl + '/colloquium/' + colloquiumId + '/colloquiumResults')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findById(colloquiumId: number, resultId: number) {
    return this.httpService.get(this.apiUrl + '/colloquium/' + colloquiumId + '/colloquiumResults/' + resultId)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  create(colloquiumId: number, result: ColloquiumResult) {
    return this.httpService.post(this.apiUrl + '/colloquium/' + colloquiumId + '/colloquiumResults/', result)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  update(colloquiumId: number, result: ColloquiumResult) {
    return this.httpService.put(this.apiUrl + '/colloquium/' + colloquiumId +  '/colloquiumResults/' + result.id, result)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  delete(colloquiumId: number, resultId: number) {
    return this.httpService.delete(this.apiUrl + '/colloquium/' + colloquiumId + '/colloquiumResults/' + resultId)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findByStudentAndColloquium(studentId: number, colloquiumId: number) {
    return this.httpService.get(this.apiUrl + '/colloquium/' + colloquiumId + '/colloquiumResults/student/' + studentId)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  getByColloquium(colloquiumId: number) {
    return this.httpService.get(this.apiUrl + '/colloquium/' + colloquiumId + '/colloquiumResults/byColloquium')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }
}
