import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Course } from '../_model/index';

export interface StudentCoursesModel {
  name: string;
  courses: Array<Course>;
}

@Component({
  selector: 'app-student-courses-modal',
  templateUrl: './student-courses-modal.component.html',
  styleUrls: ['./student-courses-modal.component.css']
})
export class StudentCoursesModalComponent extends DialogComponent<StudentCoursesModel, any> implements StudentCoursesModel {

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  courses: Array<Course>;
  name: string;

  cancel() {
    this.result = true;
    this.close();
  }

}
