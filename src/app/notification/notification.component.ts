import { Component, OnInit } from '@angular/core';
import { roles } from './../_core/constants';
import { NotificationService, CourseFileService } from './../_services/index';
import { Notification, Course } from './../_model/index';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { SessionService } from './../_core/index';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private router: Router, private toasterService: ToasterService, private notificationService: NotificationService,
    private sessionService: SessionService, private courseFileService: CourseFileService) { }

  notification = new Notification();

  ngOnInit() {
    this.notification.course = new Course();
    const role = this.sessionService.getUserRole(this.router.url);

    // get notification id
    const urlParts = this.router.url.split('/');
    const notificationId = Number(urlParts[4]);

    if(role == roles.teacher) {
      this.notificationService.findById(notificationId).subscribe(notification => {
        this.notification = notification;
      }, error => {
        this.toasterService.pop({type: 'error', title: 'Find Notification By Id', body: error.status + ' ' + error.statusText });
      });
    } else if(role == roles.student) {
      this.notificationService.readNotification(notificationId).subscribe(notification => {
        this.notification = notification;
      }, error => {
        this.toasterService.pop({type: 'error', title: 'Read Notification By Id', body: error.status + ' ' + error.statusText });
      });
    }
  }

  download() {
    this.courseFileService.download(this.notification.course.id, this.notification.document.id).subscribe(file => {
      console.log('file is ', file);
      // console.log('array buffer is ', file.arrayBuffer());
      // console.log('content type is ', file['headers'].get('content-type'));
      const blob = new Blob([file['_body']], { type: this.notification.document.mimeType });
      console.log('blob is ', blob);
      // saveAs(blob, this.notification.document.documentName);

      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style.display = 'none';
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = this.notification.document.documentName;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    }, error => {
      this.toasterService.pop({type: 'error', title: 'Download Notification File By Id', body: error.status + ' ' + error.statusText });
    });
  }
}
