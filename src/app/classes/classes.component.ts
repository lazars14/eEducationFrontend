import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollegeDirectionService } from './../_services/index';
import { CollegeDirection } from '../_model/index';
import { ToasterService } from 'angular2-toaster';
import { DialogService } from "ng2-bootstrap-modal";
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { actions } from './../_core/constants';
import { ClassModalComponent } from '../class-modal/class-modal.component';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  constructor(private router: Router, private classService: CollegeDirectionService,
    private dialogService: DialogService, private toasterService: ToasterService) { }

  classes: Array<CollegeDirection>;

  ngOnInit() {
    this.refreshPage();
  }

  refreshPage() {
    this.classService.findAll().subscribe(data => {
      this.classes = data;
    }, error => {
      this.toasterService.pop({type: 'error', title: 'Get All Classes', body: error.status + ' ' + error.statusText });
    });
  }

  moreInfo(id: number) {
    this.router.navigate([id]);
  }

  add() {
    let disposable = this.dialogService.addDialog(ClassModalComponent, {
      action: actions.add, 
      class: new CollegeDirection()})
      .subscribe((added)=>{
          //We get dialog result
          if(added != null) {
            this.classService.create(added).subscribe(added => {
              this.toasterService.pop({type: 'success', title: 'Created New Class', body: '' });
              this.refreshPage();
            }, error => {
              this.toasterService.pop({type: 'error', title: 'Create New Class', body: error.status + ' ' + error.statusText });
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

  edit(collegeDirection: CollegeDirection) {
    let disposable = this.dialogService.addDialog(ClassModalComponent, {
      action: actions.edit, 
      class: collegeDirection})
      .subscribe((edited)=>{
          //We get dialog result
          if(edited != null) {
            this.classService.update(edited).subscribe(updated => {
              this.toasterService.pop({type: 'success', title: 'Updated Class', body: '' });
              this.refreshPage();
            }, error => {
              this.toasterService.pop({type: 'error', title: 'Update Class', body: error.status + ' ' + error.statusText });
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
        header: 'Delete Class', 
        text: 'Are you sure you want to delete this class?'})
        .subscribe((isConfirmed)=>{
            //We get dialog result
            if(isConfirmed) {
              this.classService.delete(id).subscribe(deleted => {
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
