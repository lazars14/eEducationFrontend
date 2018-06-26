import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './session.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private router: Router, private sessionService: SessionService) { }

  public handleError(error: Response) {
    const httpErrorCode = error.status;
    if (httpErrorCode === 403 || httpErrorCode === 401) {
      this.sessionService.destroyUser();
      this.router.navigate(['/']);
    } else if (httpErrorCode === 401) {
      this.router.navigate(['/']);
    }

    return Observable.throw(error);
  }
}
