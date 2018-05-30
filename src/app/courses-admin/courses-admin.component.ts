import { Component, OnInit } from '@angular/core';
import { Course } from '../_model/index';
import { CourseService } from '../_services/index';
import { ToasterService } from 'angular2-toaster';
import { DialogService } from 'ng2-bootstrap-modal';
import { actions } from './../_core/constants';
import { CourseModalComponent } from '../course-modal/course-modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-courses-admin',
  templateUrl: './courses-admin.component.html',
  styleUrls: ['./courses-admin.component.css']
})
export class CoursesAdminComponent implements OnInit {

  constructor(private dialogService: DialogService, private courseService: CourseService, private toasterService: ToasterService) { }

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
    //We can close dialog calling disposable.unsubscribe();
    //If dialog was not closed manually close it by timeout
    setTimeout(() => {
        disposable.unsubscribe();
    }, 10000);
  }

  edit(course: Course) {
    let disposable = this.dialogService.addDialog(CourseModalComponent, {
      action: actions.add, 
      course: course})
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
    //We can close dialog calling disposable.unsubscribe();
    //If dialog was not closed manually close it by timeout
    setTimeout(() => {
        disposable.unsubscribe();
    }, 10000);
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
    //We can close dialog calling disposable.unsubscribe();
    //If dialog was not closed manually close it by timeout
    setTimeout(() => {
        disposable.unsubscribe();
    }, 10000);
  }

  setTeachers(courseId: number) {

  }

}
