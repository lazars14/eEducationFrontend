import { Injectable } from '@angular/core';
import { HttpService, ErrorHandlerService } from '../_core/index';
import { environment } from '../../environments/environment';
import { Notification } from '../_model/index';

@Injectable()
export class NotificationService {

  constructor(private httpService: HttpService, private errorHandlerService: ErrorHandlerService) {}

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
}
