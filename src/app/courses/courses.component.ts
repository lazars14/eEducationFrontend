import { Component, OnInit } from '@angular/core';
import { Course } from '../_model/index';
import { ToasterService } from 'angular2-toaster';
import { SessionService } from '../_core/index';
import { CourseService } from '../_services/index';
import { Router } from '@angular/router';
import { roles } from './../_core/constants';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(private toasterService: ToasterService, private sessionService: SessionService,
      private courseService: CourseService, private router: Router) { }

  courses: Array<Course>;

  ngOnInit() {
    const role = this.sessionService.getUserRole(this.router.url);

    if (role == roles.teacher) {

      this.courseService.getByTeacher(this.sessionService.getUserId()).subscribe(data => {
        this.courses = data;
      }, error => {
        this.toasterService.pop({type: 'error', title: 'Get Courses For Teacher', body: error.status + ' ' + error.statusText });
      });
    
    } else if (role == roles.student) {

      this.courseService.getByStudent(this.sessionService.getUserId()).subscribe(data => {
        this.courses = data;
      }, error => {
        this.toasterService.pop({type: 'error', title: 'Get Courses For Student', body: error.status + ' ' + error.statusText });
      });

    }
  }

}
