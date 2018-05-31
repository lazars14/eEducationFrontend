import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Course } from '../_model/index';
import { CourseService } from './../_services/index';
import { ToasterService } from 'angular2-toaster';

export interface TeacherCoursesModel {
  name: string;
  teacherId: number;
}

@Component({
  selector: 'app-teacher-courses-modal',
  templateUrl: './teacher-courses-modal.component.html',
  styleUrls: ['./teacher-courses-modal.component.css']
})
export class TeacherCoursesModalComponent extends DialogComponent<TeacherCoursesModel, boolean> implements TeacherCoursesModel, OnInit {

  constructor(dialogService: DialogService, private courseService: CourseService, private toasterService: ToasterService) {
    super(dialogService);
  }

  courses: Array<Course>;

  teacherId: number;
  name: string;

  ngOnInit() {
    this.courseService.getByTeacher(this.teacherId).subscribe(courses => {
      this.courses = courses;      
    }, error => {
      this.toasterService.pop({type: 'error', title: 'Get Courses For Teacher', body: error.status + ' ' + error.statusText });
    });
  }

  close() {
    this.close();
  }

}
