import { Injectable } from '@angular/core';
import { HttpService, ErrorHandlerService } from '../_core/index';
import { environment } from '../../environments/environment';
import { ExamTerm, ExamPeriod } from '../_model/index';

@Injectable()
export class ExamTermService {

  constructor(private httpService: HttpService, private errorHandlerService: ErrorHandlerService) {}

  apiUrl = environment.apiUrl;

  findAll(examPeriodId: number) {
    return this.httpService.get(this.apiUrl + '/examPeriod/' + examPeriodId + '/colloquiums')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findById(examPeriodId: number, colloquiumId: number) {
    return this.httpService.get(this.apiUrl + '/examPeriod/' + examPeriodId + '/colloquiums/' + colloquiumId)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  create(examPeriodId: number, examTerm: ExamTerm) {
    return this.httpService.post(this.apiUrl + '/examPeriod/' + examPeriodId + '/colloquiums/', examTerm)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  update(examPeriodId: number, examTerm: ExamTerm) {
    return this.httpService.put(this.apiUrl + '/examPeriod/' + examPeriodId +  '/colloquiums/' + examTerm.id, examTerm)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  delete(examPeriodId: number, colloquiumId: number) {
    return this.httpService.delete(this.apiUrl + '/examPeriod/' + examPeriodId + '/colloquiums/' + colloquiumId)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }
}
