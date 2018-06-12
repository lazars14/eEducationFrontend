import { Injectable } from '@angular/core';
import { HttpService, ErrorHandlerService } from '../_core/index';
import { environment } from '../../environments/environment';
import { Rank } from '../_model/index';

@Injectable()
export class RankService {

  constructor(private httpService: HttpService, private errorHandlerService: ErrorHandlerService) {}

  apiUrl = environment.apiUrl;

  findAll() {
    return this.httpService.get(this.apiUrl + '/ranks')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findById(id: number) {
    return this.httpService.get(this.apiUrl + '/ranks/' + id)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  create(rank: Rank) {
    return this.httpService.post(this.apiUrl + '/ranks/', rank)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  update(rank: Rank) {
    return this.httpService.put(this.apiUrl + '/ranks/' + rank.id, rank)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  delete(id: number) {
    return this.httpService.delete(this.apiUrl + '/ranks/' + id)
    .map((res) => res.status)
    .catch(err => this.errorHandlerService.handleError(err));
  }
}
