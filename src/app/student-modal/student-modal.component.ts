import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Student } from '../_model/index';
import { actions } from '../_core';

export interface StudentModel {
  action: string;
  student: Student;
}

@Component({
  selector: 'app-student-modal',
  templateUrl: './student-modal.component.html',
  styleUrls: ['./student-modal.component.css']
})
export class StudentModalComponent  extends DialogComponent<StudentModel, Student> implements StudentModel {

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  action: string;
  student: Student;

  add = actions.add;
  edit = actions.edit;

  ok() {
    this.result = this.student;
    this.close();
  }

  cancel() {
    this.result = null;
    this.close();
  }

}
