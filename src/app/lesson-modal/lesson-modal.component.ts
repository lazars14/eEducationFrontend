import { Component, OnInit } from '@angular/core';
import { CourseLesson } from '../_model/index';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { actions } from './../_core/constants';

export interface CourseLessonModel {
  action: string;
  courseLesson: CourseLesson;
}
@Component({
  selector: 'app-lesson-modal',
  templateUrl: './lesson-modal.component.html',
  styleUrls: ['./lesson-modal.component.css']
})
export class LessonModalComponent extends DialogComponent<CourseLessonModel, any> implements CourseLessonModel {

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  action: string;
  courseLesson: CourseLesson;

  add = actions.add;
  edit = actions.edit;

  inputFiles: any;

  ok() {
    if (this.action === this.add) {
      if (!this.inputFiles) {
        this.inputFiles = null;
      }
      this.result = {file: this.inputFiles, courseLesson: this.courseLesson};
      this.close();
    } else {
      this.result = this.courseLesson;
      this.close();
    }
    
  }

  cancel() {
    this.result = null;
    this.close();
  }

  onChange(files: any) {
    this.inputFiles = files;
  }

}
