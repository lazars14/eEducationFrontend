import { Component, OnInit } from '@angular/core';
import { roles } from './../_core/constants';
import { NotificationService } from './../_services/index';
import { Notification } from './../_model/index';
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
    private sessionService: SessionService) { }

  notification = new Notification();

  ngOnInit() {
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

  download(courseFileId: number) {
    // to do
  }
}
