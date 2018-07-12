import { Component, OnInit } from '@angular/core';
import { Course } from '../_model/index';
import { CourseService, TeacherTeachesCourseService } from '../_services/index';
import { ToasterService } from 'angular2-toaster';
import { DialogService } from 'ng2-bootstrap-modal';
import { actions } from './../_core/constants';
import { CourseModalComponent } from '../course-modal/course-modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { SetTeachersModalComponent } from '../set-teachers-modal/set-teachers-modal.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-courses-admin',
  templateUrl: './courses-admin.component.html',
  styleUrls: ['./courses-admin.component.css']
})
export class CoursesAdminComponent implements OnInit {

  constructor(private dialogService: DialogService, private courseService: CourseService, private toasterService: ToasterService, 
    private ttcService: TeacherTeachesCourseService) { }

  courses: Array<Course>;

  ngOnInit() {
    this.refreshPage();
  }

  refreshPage() {
    this.courseService.findAll().subscribe(data => {
      this.courses = data;
    }, error => {
      this.toasterService.pop({type: 'error', title: 'Get All Courses', body: error.status + ' ' + error.statusText });
    });
  }

  add() {
    let disposable = this.dialogService.addDialog(CourseModalComponent, {
      action: actions.add, 
      course: new Course()})
      .subscribe((added) => {
          //We get dialog result
          if(added != null) {
            this.courseService.create(added).subscribe(added => {
              this.toasterService.pop({type: 'success', title: 'Created New Course', body: '' });
              this.refreshPage();
            }, error => {
              this.toasterService.pop({type: 'error', title: 'Create New Course', body: error.status + ' ' + error.statusText });
            });
          }
          else {
            // do nothing, dialog closed
          }
      });
  }

  edit(course: Course) {
    let disposable = this.dialogService.addDialog(CourseModalComponent, {
      action: actions.edit, 
      course: _.cloneDeep(course)})
      .subscribe((edited) => {
          //We get dialog result
          if(edited != null) {
            this.courseService.update(edited).subscribe(updated => {
              this.toasterService.pop({type: 'success', title: 'Updated Course', body: '' });
              this.refreshPage();
            }, error => {
              this.toasterService.pop({type: 'error', title: 'Updated Course', body: error.status + ' ' + error.statusText });
            });
          }
          else {
            // do nothing, dialog closed
          }
      });
  }

  delete(id: number) {
    let disposable = this.dialogService.addDialog(ConfirmModalComponent, {
      header: 'Delete Course', 
      text: 'Are you sure you want to delete this course?'})
      .subscribe((isConfirmed)=>{
          //We get dialog result
          if(isConfirmed) {
            this.courseService.delete(id).subscribe(deleted => {
              this.toasterService.pop({type: 'success', title: 'Deleted Course', body: '' });
              this.refreshPage();
            }, error => {
              this.toasterService.pop({type: 'error', title: 'Delete Course', body: error.status + ' ' + error.statusText });
            });
          }
          else {
            // do nothing, dialog closed
          }
      });
  }

  setTeachers(courseId: number) {
    let disposable = this.dialogService.addDialog(SetTeachersModalComponent, {
      courseId: courseId })
      .subscribe((lists)=>{
          //We get dialog result
          if(lists != null) {
            const addedTeachers = lists['added'];
            const removedTeachers = lists['removed'];

            this.ttcService.batchAdd(addedTeachers, courseId).subscribe(done => {
              this.ttcService.batchRemove(removedTeachers, courseId).subscribe(done => {
                this.refreshPage();
              }, error => {
                this.toasterService.pop({type: 'error', title: 'Batch Remove Ttc', body: error.status + ' ' + error.statusText });
              });
            }, error => {
              this.toasterService.pop({type: 'error', title: 'Batch Add Ttc', body: error.status + ' ' + error.statusText });
            });

          }
          else {
            // do nothing, dialog closed
          }
      });
  }

}
