import { Injectable } from '@angular/core';
import { HttpService, ErrorHandlerService } from '../_core/index';
import { environment } from '../../environments/environment';
import { CollegeDirection } from '../_model/index';

@Injectable()
export class CollegeDirectionService {

  constructor(private httpService: HttpService, private errorHandlerService: ErrorHandlerService) {}

  apiUrl = environment.apiUrl;

  findAll() {
    return this.httpService.get(this.apiUrl + '/classes')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findById(id: number) {
    return this.httpService.get(this.apiUrl + '/classes/' + id)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  create(direction: CollegeDirection) {
    return this.httpService.post(this.apiUrl + '/classes/', direction)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  update(direction: CollegeDirection) {
    return this.httpService.put(this.apiUrl + '/classes/' + direction.id, direction)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  delete(id: number) {
    return this.httpService.delete(this.apiUrl + '/classes/' + id)
    .map((res) => res.status)
    .catch(err => this.errorHandlerService.handleError(err));
  }
}
