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

  delete(id: number) {
    let disposable = this.dialogService.addDialog(ConfirmModalComponent, {
        header: 'Delete Notification', 
        text: 'Are you sure you want to delete this notification?'})
        .subscribe((isConfirmed)=>{
            //We get dialog result
            if(isConfirmed) {
              this.notificationService.delete(id).subscribe(deleted => {
                this.toasterService.pop({type: 'success', title: 'Deleted Student Notification', body: '' });
                this.refreshPage();
              }, error => {
                this.toasterService.pop({type: 'error', title: 'Student Delete Notification', body: error.status + ' ' + error.statusText });
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
