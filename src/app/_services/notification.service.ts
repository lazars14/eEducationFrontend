import { Injectable } from '@angular/core';
import { HttpService, ErrorHandlerService, SessionService } from '../_core/index';
import { Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Notification } from '../_model/index';
import { roles } from './../_core/constants';

@Injectable()
export class NotificationService {

  constructor(private httpService: HttpService, private errorHandlerService: ErrorHandlerService,
    private sessionService: SessionService) {}

  apiUrl = environment.apiUrl;

  findAll() {
    return this.httpService.get(this.apiUrl + '/notifications')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findById(id: number) {
    return this.httpService.get(this.apiUrl + '/notifications/' + id)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  create(message: string, courseId: number, file: any) {
    return this.httpService.post(this.apiUrl + '/notifications/course/' + courseId + '/batchAdd',
    {message: message, file: file })
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  update(notification: Notification) {
    return this.httpService.put(this.apiUrl + '/notifications/' + notification.id, notification)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  delete(id: number) {
    return this.httpService.delete(this.apiUrl + '/notifications/' + id)
    .map((res) => res.status)
    .catch(err => this.errorHandlerService.handleError(err));
  }

  getByStudent() {
    return this.httpService.get(this.apiUrl + '/notifications/student/' + this.sessionService.getUserId())
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  getByCourseAndStudent(courseId: number) {
    return this.httpService.get(this.apiUrl + '/notifications/course/' + courseId + '/student/' + this.sessionService.getUserId())
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  getByCourseDistinct(courseId: number) {
    return this.httpService.get(this.apiUrl + '/notifications/course/' + courseId + '/distinctMessages')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  readNotification(id: number) {
    return this.httpService.get(this.apiUrl + '/notifications/' + id + '/read')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  batchAdd(courseId: number, formData: FormData) {
    return this.httpService.post(this.apiUrl + '/notifications/course/' + courseId + '/batchAdd',
    formData)
    .map((res) => res.status)
    .catch(err => this.errorHandlerService.handleError(err));
  }

  batchUpdate(courseId: number, formData: FormData) {
    return this.httpService.post(this.apiUrl + '/notifications/course/' + courseId + '/batchUpdate',
    formData)
    .map((res) => res.status)
    .catch(err => this.errorHandlerService.handleError(err));
  }

  batchDelete(notification: Notification) {
    return this.httpService.put(this.apiUrl + '/notifications/batchDelete', notification)
    .map((res) => res.status)
    .catch(err => this.errorHandlerService.handleError(err));
  }
}
