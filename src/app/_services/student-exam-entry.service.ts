import { Injectable } from '@angular/core';
import { HttpService, ErrorHandlerService } from '../_core/index';
import { environment } from '../../environments/environment';
import { StudentExamEntry } from '../_model/index';

@Injectable()
export class StudentExamEntryService {

  constructor(private httpService: HttpService, private errorHandlerService: ErrorHandlerService) {}

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
    return this.httpService.post(this.apiUrl + '/examEntries/', entry)
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
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }
}
