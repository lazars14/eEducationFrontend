import { Component, OnInit } from '@angular/core';
import { CourseLesson } from '../_model/index';
import { roles, actions } from './../_core/constants';
import { Router } from '@angular/router';
import { SessionService } from '../_core/index';
import { CourseLessonService } from './../_services/index';
import { ToasterService } from 'angular2-toaster';
import { DialogService } from 'ng2-bootstrap-modal';
import { LessonModalComponent } from '../lesson-modal/lesson-modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-course-lessons',
  templateUrl: './course-lessons.component.html',
  styleUrls: ['./course-lessons.component.css']
})
export class CourseLessonsComponent implements OnInit {

  constructor(private sessionService: SessionService, private router: Router, private courseLessonService: CourseLessonService,
    private toasterService: ToasterService, private dialogService: DialogService) { }

  courseLessons: Array<CourseLesson>;
  
  role: string;
  teacher = roles.teacher;
  student = roles.student;

  courseId: number;

  ngOnInit() {
    this.refreshPage();
  }

  refreshPage() {
    this.role = this.sessionService.getUserRole(this.router.url);
    
    // get course id
    const urlItems = this.router.url.split('/');
    this.courseId = Number(urlItems[4]);

    this.courseLessonService.getByCourse(this.courseId).subscribe(data => {
      this.courseLessons = data;
    }, error => {
      this.toasterService.pop({type: 'error', title: 'Get Courses For Student', body: error.status + ' ' + error.statusText });
    });
  }

  add() {
    let disposable = this.dialogService.addDialog(LessonModalComponent, {
      action: actions.add, 
      courseLesson: new CourseLesson()})
      .subscribe((added) => {
          //We get dialog result
          if(added != null) {
            this.courseLessonService.create(this.courseId, added).subscribe(added => {
              this.toasterService.pop({type: 'success', title: 'Created New Course Lesson', body: '' });
              this.refreshPage();
            }, error => {
              this.toasterService.pop({type: 'error', title: 'Create New Course Lesson', body: error.status + ' ' + error.statusText });
            });
          }
          else {
            // do nothing, dialog closed
          }
      });
  }

  edit(courseLesson: CourseLesson) {
    let disposable = this.dialogService.addDialog(LessonModalComponent, {
      action: actions.add, 
      courseLesson: _.cloneDeep(courseLesson)})
      .subscribe((edited) => {
          //We get dialog result
          if(edited != null) {
            this.courseLessonService.create(this.courseId, edited).subscribe(updated => {
              this.toasterService.pop({type: 'success', title: 'Updated Course Lesson', body: '' });
              this.refreshPage();
            }, error => {
              this.toasterService.pop({type: 'error', title: 'Update Course Lesson', body: error.status + ' ' + error.statusText });
            });
          }
          else {
            // do nothing, dialog closed
          }
      });
  }

  delete(id: number) {
    let disposable = this.dialogService.addDialog(ConfirmModalComponent, {
      header: 'Delete Course Lesson', 
      text: 'Are you sure you want to delete this course lesson?'})
      .subscribe((isConfirmed)=>{
          //We get dialog result
          if(isConfirmed) {
            this.courseLessonService.delete(this.courseId, id).subscribe(deleted => {
              this.toasterService.pop({type: 'success', title: 'Deleted Course Lesson', body: '' });
              this.refreshPage();
            }, error => {
              this.toasterService.pop({type: 'error', title: 'Delete Course Lesson', body: error.status + ' ' + error.statusText });
            });
          }
          else {
            // do nothing, dialog closed
          }
      });
  }

}
