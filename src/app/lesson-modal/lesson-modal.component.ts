import { Component, OnInit } from '@angular/core';
import { CourseLesson } from '../_model/index';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

export interface CourseLessonModel {
  action: string;
  courseLesson: CourseLesson;
}
@Component({
  selector: 'app-lesson-modal',
  templateUrl: './lesson-modal.component.html',
  styleUrls: ['./lesson-modal.component.css']
})
export class LessonModalComponent extends DialogComponent<CourseLessonModel, CourseLesson> implements CourseLessonModel {

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  action: string;
  courseLesson: CourseLesson;

  ok() {
    this.result = this.courseLesson;
    this.close();
  }

  cancel() {
    this.result = null;
    this.close();
  }

}
