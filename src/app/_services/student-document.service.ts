import { Injectable } from '@angular/core';
import { HttpService, ErrorHandlerService } from '../_core/index';
import { environment } from '../../environments/environment';
import { StudentDocument, Course } from '../_model/index';

@Injectable()
export class StudentDocumentService {

  constructor(private httpService: HttpService, private errorHandlerService: ErrorHandlerService) {}

  apiUrl = environment.apiUrl;

  findAll(courseId: number) {
    return this.httpService.get(this.apiUrl + '/course/' + courseId + '/studentDocuments')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findById(courseId: number, documentId: number) {
    return this.httpService.get(this.apiUrl + '/course/' + courseId + '/studentDocuments/' + documentId)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  create(courseId: number, document: StudentDocument) {
    return this.httpService.post(this.apiUrl + '/course/' + courseId + '/studentDocuments/', document)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  update(courseId: number, document: StudentDocument) {
    return this.httpService.put(this.apiUrl + '/course/' + courseId +  '/studentDocuments/' + document.id, document)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  delete(courseId: number, documentId: number) {
    return this.httpService.delete(this.apiUrl + '/course/' + courseId + '/studentDocuments/' + documentId)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }
}
