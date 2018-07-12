import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { roles } from './../_core/constants';
import { SessionService } from '../_core';

@Component({
  selector: 'app-course-navbar',
  templateUrl: './course-navbar.component.html',
  styleUrls: ['./course-navbar.component.css']
})
export class CourseNavbarComponent implements OnInit {

  constructor(private router: Router, private sessionService: SessionService) { }

  courseId: number;

  redirectUrl: string;

  role: string;

  ngOnInit() {
    this.role = this.sessionService.getLoggedUserRole();

    const urlParts = this.router.url.split('/');
    const urlPartsNeeded = [urlParts[0], urlParts[1], urlParts[2], urlParts[3], urlParts[4]];
    this.redirectUrl = urlPartsNeeded.join('/');
  }

  goTo(component: string) {
    this.redirectUrl += '/' + component;
    this.router.navigate([this.redirectUrl]);
  }

}
