import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Notification } from '../_model/index';

export interface NotificationModel {
  action: string;
  notification: Notification;
}
@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.css']
})
export class NotificationModalComponent extends DialogComponent<NotificationModel, Notification> implements NotificationModel {

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  action: string;
  notification: Notification;

  ok() {
    this.result = this.notification;
    this.close();
  }

  cancel() {
    this.result = null;
    this.close();
  }
}
