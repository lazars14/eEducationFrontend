import { Injectable } from '@angular/core';
import { HttpService, ErrorHandlerService, SessionService } from '../_core/index';
import { environment } from '../../environments/environment';
import { Payment } from '../_model/index';
@Injectable()
export class PaymentService {

  constructor(private httpService: HttpService, private errorHandlerService: ErrorHandlerService,
    private sessionService: SessionService) {}

  apiUrl = environment.apiUrl;

  findAll() {
    return this.httpService.get(this.apiUrl + '/payments')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findById(id: number) {
    return this.httpService.get(this.apiUrl + '/payments/' + id)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  create(payment: Payment) {
    return this.httpService.post(this.apiUrl + '/payments/', payment)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  update(payment: Payment) {
    return this.httpService.put(this.apiUrl + '/payments/' + payment.id, payment)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  delete(id: number) {
    return this.httpService.delete(this.apiUrl + '/payments/' + id)
    .map((res) => res.status)
    .catch(err => this.errorHandlerService.handleError(err));
  }

  getByStudent() {
    return this.httpService.get(this.apiUrl + '/payments/students/' + this.sessionService.getUserId())
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }
}
