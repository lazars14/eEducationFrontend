import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { ExamTerm, Course } from '../_model/index';
import { CourseService } from '../_services';
import { ToasterService } from 'angular2-toaster';
import { actions } from '../_core';

export interface ExamTermModel {
  action: string;
  examTerm: ExamTerm;
}
@Component({
  selector: 'app-exam-term-modal',
  templateUrl: './exam-term-modal.component.html',
  styleUrls: ['./exam-term-modal.component.css']
})
export class ExamTermModalComponent extends DialogComponent<ExamTermModel, ExamTerm> implements ExamTermModel, OnInit {

  constructor(dialogService: DialogService, private courseService: CourseService, private toasterService: ToasterService) {
    super(dialogService);
  }

  ngOnInit() {
    this.examTerm.examDate = new Date(this.examTerm.examDate);

    this.courseService.findAll().subscribe(courses => {
      this.courses = courses;

      // set selected course if edit
      if(this.action == actions.edit) {
        this.selectedCourseId = this.examTerm.course.id; 
      }
    }, error => {
      this.toasterService.pop({type: 'error', title: 'Get All Courses', body: error.status + ' ' + error.statusText });
    });
  }

  courses: Array<Course>;
  selectedCourseId: any;

  action: string;
  examTerm: ExamTerm;

  get time() {
    if (this.examTerm.examDate) {

      const hour = this.examTerm.examDate.getHours();
      const minutes = this.examTerm.examDate.getMinutes();

      let hourStr, minStr;

      if (hour < 10) {
        hourStr = '0' + hour;
      } else {
        hourStr = hour.toString();
      }

      if (minutes < 10) {
        minStr = '0' + minutes;
      } else {
        hourStr = hour.toString();
      }

      return hourStr + ':' + minStr;
    }
  }

  ok(time) {
    const month = this.examTerm.examDate.getMonth() + 1,
    day = this.examTerm.examDate.getDate(),
    year = this.examTerm.examDate.getFullYear();
    this.examTerm.examDate = new Date(month + '-' + day + '-' + year + ' ' + time);

    const found = this.courses.find(i => i.id == Number(this.selectedCourseId));
    this.examTerm.course = found;

    this.result = this.examTerm;
    this.close();
  }

  cancel() {
    this.result = null;
    this.close();
  }

}
