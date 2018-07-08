import { Component, OnInit } from '@angular/core';
import { Notification, Course } from '../_model/index';
import { roles, actions } from './../_core/constants';
import { Router } from '@angular/router';
import { SessionService } from '../_core/index';
import { NotificationService, CourseService } from './../_services/index';
import { ToasterService } from 'angular2-toaster';
import { DialogService } from 'ng2-bootstrap-modal';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import * as _ from 'lodash';
import { RequestOptions } from '@angular/http';

@Component({
  selector: 'app-course-notifications',
  templateUrl: './course-notifications.component.html',
  styleUrls: ['./course-notifications.component.css']
})
export class CourseNotificationsComponent implements OnInit {

  constructor(private sessionService: SessionService, private router: Router, private notificationService: NotificationService,
    private toasterService: ToasterService, private dialogService: DialogService, private courseService: CourseService) { }

  notifications: Array<Notification>;
  
  role: string;
  teacher = roles.teacher;
  student = roles.student;

  courseId: number;
  course: Course;

  ngOnInit() {
    this.refreshPage();
  }

  refreshPage() {
    this.role = this.sessionService.getUserRole(this.router.url);
    
    // get course id
    const urlItems = this.router.url.split('/');
    this.courseId = Number(urlItems[4]);

    this.courseService.findById(this.courseId).subscribe(course => {
      this.course = course;
    }, error => {
      this.toasterService.pop({type: 'error', title: 'Get Course By Id', body: error.status + ' ' + error.statusText });
    });

    this.notificationService.getByCourseDistinct(this.courseId).subscribe(data => {
      this.notifications = data;
    }, error => {
      this.toasterService.pop({type: 'error', title: 'Get Notifications For Teacher Course', body: error.status + ' ' + error.statusText });
    });

  }

  add() {
    let disposable = this.dialogService.addDialog(NotificationModalComponent, {
      action: actions.add, 
      notification: new Notification()})
      .subscribe((added) => {
          //We get dialog result
          if(added != null) {
            console.log('added is ', added);
            // added.course = this.course;
            console.log('file is ', added.file);
            const formData = new FormData();
            formData.append('file', added.file);
            formData.append('message', added.notification.message);
            console.log('form data is ', formData);
            this.notificationService.batchAdd(this.courseId, formData).subscribe(created => {
              this.toasterService.pop({type: 'success', title: 'Created New Notification', body: '' });
              this.refreshPage();
            }, error => {
              this.toasterService.pop({type: 'error', title: 'Create New Notification', body: error.status + ' ' + error.statusText });
            });
          }
          else {
            // do nothing, dialog closed
          }
      });
  }

  edit(notification: Notification) {
    let disposable = this.dialogService.addDialog(NotificationModalComponent, {
      action: actions.edit, 
      notification: _.cloneDeep(notification)})
      .subscribe((edited) => {
          //We get dialog result
          if(edited != null) {
            // added.course = this.course;
            console.log('file is ', edited.file);
            const formData = new FormData();
            formData.append('file', edited.file);
            formData.append('message', edited.notification.message);
            formData.append('notificationId', String(notification.id));
            console.log('form data is ', formData);
            this.notificationService.batchUpdate(this.courseId, formData).subscribe(changed => {
              this.toasterService.pop({type: 'success', title: 'Updated Notifications', body: '' });
              this.refreshPage();
            }, error => {
              this.toasterService.pop({type: 'error', title: 'Error Updating Notifications', body: error.status + ' ' + error.statusText });
            });
          }
          else {
            // do nothing, dialog closed
          }
      });
  }

  delete(notification: Notification) {
    let disposable = this.dialogService.addDialog(ConfirmModalComponent, {
      header: 'Delete Notification', 
      text: 'Are you sure you want to delete this notification?'})
      .subscribe((isConfirmed)=>{
          //We get dialog result
          if(isConfirmed) {
            this.notificationService.batchDelete(notification).subscribe(deleted => {
              this.toasterService.pop({type: 'success', title: 'Deleted Notification', body: '' });
              this.refreshPage();
            }, error => {
              console.log('error is ', error);
              this.toasterService.pop({type: 'error', title: 'Delete Notification', body: error.status + ' ' + error.statusText });
            });
          }
          else {
            // do nothing, dialog closed
          }
      });
  }

}
