import { Component, OnInit } from '@angular/core';
import { Notification } from '../_model/index';
import { roles, actions } from './../_core/constants';
import { Router } from '@angular/router';
import { SessionService } from '../_core/index';
import { NotificationService } from './../_services/index';
import { ToasterService } from 'angular2-toaster';
import { DialogService } from 'ng2-bootstrap-modal';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-course-notifications',
  templateUrl: './course-notifications.component.html',
  styleUrls: ['./course-notifications.component.css']
})
export class CourseNotificationsComponent implements OnInit {

  constructor(private sessionService: SessionService, private router: Router, private notificationService: NotificationService,
    private toasterService: ToasterService, private dialogService: DialogService) { }

  notifications: Array<Notification>;
  
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

    if (this.role == this.teacher) {
      this.notificationService.getByCourseDistinct(this.courseId).subscribe(data => {
        this.notifications = data;
      }, error => {
        this.toasterService.pop({type: 'error', title: 'Get Notifications For Teacher Course', body: error.status + ' ' + error.statusText });
      });
    } else if (this.role == this.student) {
      this.notificationService.getByCourseAndStudent(this.courseId).subscribe(data => {
        this.notifications = data;
      }, error => {
        this.toasterService.pop({type: 'error', title: 'Get Notifications For Student Course', body: error.status + ' ' + error.statusText });
      });
    }

  }

  moreInfo(id: number) {
    this.router.navigate([id]);
  }

  add() {
    let disposable = this.dialogService.addDialog(NotificationModalComponent, {
      action: actions.add, 
      notification: new Notification()})
      .subscribe((added) => {
          //We get dialog result
          if(added != null) {
            this.notificationService.create(added).subscribe(added => {
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
    //We can close dialog calling disposable.unsubscribe();
    //If dialog was not closed manually close it by timeout
    setTimeout(() => {
        disposable.unsubscribe();
    }, 10000);
  }

  edit(notification: Notification) {
    let disposable = this.dialogService.addDialog(NotificationModalComponent, {
      action: actions.add, 
      notification: notification})
      .subscribe((edited) => {
          //We get dialog result
          if(edited != null) {
            this.notificationService.create(edited).subscribe(updated => {
              this.toasterService.pop({type: 'success', title: 'Updated Notification', body: '' });
              this.refreshPage();
            }, error => {
              this.toasterService.pop({type: 'error', title: 'Update Notification', body: error.status + ' ' + error.statusText });
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
      header: 'Delete Notification', 
      text: 'Are you sure you want to delete this notification?'})
      .subscribe((isConfirmed)=>{
          //We get dialog result
          if(isConfirmed) {
            this.notificationService.delete(id).subscribe(deleted => {
              this.toasterService.pop({type: 'success', title: 'Deleted Notification', body: '' });
              this.refreshPage();
            }, error => {
              this.toasterService.pop({type: 'error', title: 'Delete Notification', body: error.status + ' ' + error.statusText });
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

}
