import { Component, OnInit } from '@angular/core';
import { Teacher } from '../_model/index';
import { TeacherService } from './../_services/index';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToasterService } from 'angular2-toaster';
import { TeacherModalComponent } from '../teacher-modal/teacher-modal.component';
import { actions } from './../_core/constants';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { TeacherCoursesModalComponent } from '../teacher-courses-modal/teacher-courses-modal.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  constructor(private teacherService: TeacherService, private dialogService: DialogService, private toasterService: ToasterService) { }

  teachers: Array<Teacher>;

  ngOnInit() {
    this.refreshPage();
  }

  refreshPage() {
    this.teacherService.findAll().subscribe(data => {
      this.teachers = data;
    }, error => {
      this.toasterService.pop({type: 'error', title: 'Get All Classes', body: error.status + ' ' + error.statusText });
    });
  }

  add() {
    let disposable = this.dialogService.addDialog(TeacherModalComponent, {
      action: actions.add, 
      teacher: new Teacher()})
      .subscribe((added) => {
          //We get dialog result
          if(added != null) {
            this.teacherService.create(added).subscribe(added => {
              this.toasterService.pop({type: 'success', title: 'Created New Teacher', body: '' });
              this.refreshPage();
            }, error => {
              this.toasterService.pop({type: 'error', title: 'Create New Teacher', body: error.status + ' ' + error.statusText });
            });
          }
          else {
            // do nothing, dialog closed
          }
      });
  }

  edit(teacher: Teacher) {
    let disposable = this.dialogService.addDialog(TeacherModalComponent, {
      action: actions.edit, 
      teacher: _.cloneDeep(teacher)})
      .subscribe((edited)=>{
          //We get dialog result
          if(edited != null) {
            this.teacherService.update(edited).subscribe(updated => {
              this.toasterService.pop({type: 'success', title: 'Updated Teacher', body: '' });
              this.refreshPage();
            }, error => {
              this.toasterService.pop({type: 'error', title: 'Update Teacher', body: error.status + ' ' + error.statusText });
            });
          }
          else {
            // do nothing, dialog closed
          }
      });
  }

  delete(id: number) {
    let disposable = this.dialogService.addDialog(ConfirmModalComponent, {
      header: 'Delete Teacher', 
      text: 'Are you sure you want to delete this teacher?'})
      .subscribe((isConfirmed)=>{
          //We get dialog result
          if(isConfirmed) {
            this.teacherService.delete(id).subscribe(deleted => {
              this.toasterService.pop({type: 'success', title: 'Deleted Teacher', body: '' });
              this.refreshPage();
            }, error => {
              this.toasterService.pop({type: 'error', title: 'Delete Teacher', body: error.status + ' ' + error.statusText });
            });
          }
          else {
            // do nothing, dialog closed
          }
      });
  }

  viewCourses(teacherId: number, teacherFirstName: string, teacherLastName: string) {
    let disposable = this.dialogService.addDialog(TeacherCoursesModalComponent, {
      name: teacherFirstName + ' ' + teacherLastName, 
      teacherId: teacherId })
      .subscribe((edited)=>{
          //We get dialog result
          if (edited != null) {
            // read only, do nothing
          } else {
            // do nothing, dialog closed
          }
      });
  }

}
