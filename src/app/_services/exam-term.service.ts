import { Injectable } from '@angular/core';
import { HttpService, ErrorHandlerService } from '../_core/index';
import { environment } from '../../environments/environment';
import { ExamTerm, ExamPeriod } from '../_model/index';

@Injectable()
export class ExamTermService {

  constructor(private httpService: HttpService, private errorHandlerService: ErrorHandlerService) {}

  apiUrl = environment.apiUrl;

  findAll(examPeriodId: number) {
    return this.httpService.get(this.apiUrl + '/examPeriod/' + examPeriodId)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findById(examPeriodId: number) {
    return this.httpService.get(this.apiUrl + '/examPeriod/' + examPeriodId)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  create(examPeriodId: number, examTerm: ExamTerm) {
    return this.httpService.post(this.apiUrl + '/examPeriod/' + examPeriodId + '/examTerms/', examTerm)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  update(examPeriodId: number, examTerm: ExamTerm) {
    return this.httpService.put(this.apiUrl + '/examPeriod/' + examPeriodId +  '/examTerms/' + examTerm.id, examTerm)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  delete(examPeriodId: number, examTermId: number) {
    return this.httpService.delete(this.apiUrl + '/examPeriod/' + examPeriodId + '/examTerms/' + examTermId)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  getByExamPeriod(examPeriodId: number) {
    return this.httpService.get(this.apiUrl + '/examPeriod/' + examPeriodId + '/byExamPeriod')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }
}
