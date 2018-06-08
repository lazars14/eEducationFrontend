import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Course, Teacher } from '../_model/index';
import { TeacherService } from './../_services/index';
import { ToasterService } from 'angular2-toaster';

export interface CourseModel {
  action: string;
  course: Course;
}

@Component({
  selector: 'app-course-modal',
  templateUrl: './course-modal.component.html',
  styleUrls: ['./course-modal.component.css']
})
export class CourseModalComponent extends DialogComponent<CourseModel, Course> implements CourseModel, OnInit {

  action: string;
  course: Course;

  teachers: Array<Teacher>;
  selectedTeacherId: number;

  constructor(dialogService: DialogService, private teacherService: TeacherService, private toasterService: ToasterService) {
    super(dialogService);
  }

  ngOnInit() {
    this.teacherService.findAll().subscribe(data => {
      this.teachers = data;
    }, error => {
      this.toasterService.pop({type: 'error', title: 'Get All Teachers', body: error.status + ' ' + error.statusText });
    });
  }

  ok() {
    const selectedTeacher = this.teachers.find(i => i.id === this.selectedTeacherId);
    this.course.teacher = selectedTeacher;

    this.result = this.course;
    this.close();
  }

  cancel() {
    this.result = null;
    this.close();
  }

}
