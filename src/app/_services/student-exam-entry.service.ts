import { Injectable } from '@angular/core';
import { HttpService, ErrorHandlerService, SessionService } from '../_core/index';
import { environment } from '../../environments/environment';
import { StudentExamEntry } from '../_model/index';
import { roles } from './../_core/constants';

@Injectable()
export class StudentExamEntryService {

  constructor(private httpService: HttpService, private errorHandlerService: ErrorHandlerService, private sessionService: SessionService) {}

  apiUrl = environment.apiUrl;

  findAll() {
    return this.httpService.get(this.apiUrl + '/examEntries')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findById(id: number) {
    return this.httpService.get(this.apiUrl + '/examEntries/' + id)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  create(entry: StudentExamEntry) {
    return this.httpService.post(this.apiUrl + '/examEntries', entry)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  update(entry: StudentExamEntry) {
    return this.httpService.put(this.apiUrl + '/examEntries/' + entry.id, entry)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  delete(id: number) {
    return this.httpService.delete(this.apiUrl + '/examEntries/' + id)
    .map((res) => res.status)
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findByExamTermAndStudent(examTermId: number) {
    return this.httpService.get(this.apiUrl + '/examEntries/examTerms/' + examTermId + '/student/' + this.sessionService.getUserId())
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findByExamTermAndTeacher(examTermId: number) {
    return this.httpService.get(this.apiUrl + '/examEntries/examTerms/' + examTermId + '/teacher/' + this.sessionService.getUserId())
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }
}
