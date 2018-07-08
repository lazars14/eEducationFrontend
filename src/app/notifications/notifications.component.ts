import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from './../_services/index';
import { Notification } from '../_model/index';
import { ToasterService } from 'angular2-toaster';
import { DialogService } from "ng2-bootstrap-modal";
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private router: Router, private notificationService: NotificationService, 
    private toasterService: ToasterService, private dialogService: DialogService) { }

  notifications: Array<Notification>;

  ngOnInit() {
    this.refreshPage();
  }

  refreshPage() {
    this.notificationService.getByStudent().subscribe(data => {
      this.notifications = data;
    }, error => {
      this.toasterService.pop({type: 'error', title: 'Get Notifications By Student', body: error.status + ' ' + error.statusText });
    });
  }

}
