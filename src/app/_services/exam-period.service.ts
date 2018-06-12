import { Injectable } from '@angular/core';
import { HttpService, ErrorHandlerService } from '../_core/index';
import { environment } from '../../environments/environment';
import { ExamPeriod } from '../_model/index';

@Injectable()
export class ExamPeriodService {

  constructor(private httpService: HttpService, private errorHandlerService: ErrorHandlerService) {}

  apiUrl = environment.apiUrl;

  findAll() {
    return this.httpService.get(this.apiUrl + '/examPeriods')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findById(id: number) {
    return this.httpService.get(this.apiUrl + '/examPeriods/' + id)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  create(examPeriod: ExamPeriod) {
    return this.httpService.post(this.apiUrl + '/examPeriods/', examPeriod)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  update(examPeriod: ExamPeriod) {
    return this.httpService.put(this.apiUrl + '/examPeriods/' + examPeriod.id, examPeriod)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  delete(id: number) {
    return this.httpService.delete(this.apiUrl + '/examPeriods/' + id)
    .map((res) => res.status)
    .catch(err => this.errorHandlerService.handleError(err));
  }
}
