import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Student, CollegeDirection } from '../_model/index';
import { CollegeDirectionService } from './../_services/index';
import { ToasterService } from 'angular2-toaster';

export interface StudentTransferModel {
  student: Student
}
@Component({
  selector: 'app-student-transfer-modal',
  templateUrl: './student-transfer-modal.component.html',
  styleUrls: ['./student-transfer-modal.component.css']
})
export class StudentTransferModalComponent extends DialogComponent<StudentTransferModel, Student> implements StudentTransferModel, OnInit {

  constructor(dialogService: DialogService, private classService: CollegeDirectionService, private toasterService: ToasterService) {
    super(dialogService);
  }

  student: Student;
  
  classes: Array<CollegeDirection>;
  selectedClassId: number;

  ngOnInit() {
    this.classService.findAll().subscribe(data => {
      this.classes = data;

      // remove student's class
      const found = this.classes.find(i => i.id === this.student.direction.id);
      const index = this.classes.indexOf(found);
      this.classes.splice(index, 1);

    }, error => {
      this.toasterService.pop({type: 'error', title: 'Get All Classes', body: error.status + ' ' + error.statusText });
    });
  }

  ok() {
    const selectedClass = this.classes.find(i => i.id === this.selectedClassId);
    this.student.direction = selectedClass;

    this.result = this.student;
    this.close();
  }

  cancel() {
    this.result = null;
    this.close();
  }

}
