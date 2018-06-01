import { Injectable } from '@angular/core';
import { HttpService, ErrorHandlerService, SessionService } from '../_core/index';
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

  create(notification: Notification) {
    return this.httpService.post(this.apiUrl + '/notifications/', notification)
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
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  getByStudent() {
    return this.httpService.get(this.apiUrl + '/notifications/student/' + this.sessionService.getUserId(roles.student))
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  getByCourseAndStudent(courseId: number) {
    return this.httpService.get(this.apiUrl + '/notifications/course/' + courseId + '/student/' + this.sessionService.getUserId(roles.student))
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

  batchAdd(notification: Notification) {
    return this.httpService.post(this.apiUrl + '/notifications/batchAdd', notification)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  batchUpdate(notification: Notification) {
    return this.httpService.put(this.apiUrl + '/notifications/batchUpdate', notification)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }
}
