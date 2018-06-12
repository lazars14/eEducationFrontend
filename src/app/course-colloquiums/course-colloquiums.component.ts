import { Component, OnInit } from '@angular/core';
import { Colloquium, StudentDocument, ColloquiumResult } from '../_model/index';
import { SessionService } from '../_core/index';
import { ColloquiumService, ColloquiumResultService } from '../_services/index';
import { roles, strings, actions } from './../_core/constants';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { DialogService } from 'ng2-bootstrap-modal';
import { EnterColloquiumModalComponent } from '../enter-colloquium-modal/enter-colloquium-modal.component';
import { ColloquiumResultModalComponent } from '../colloquium-result-modal/colloquium-result-modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { ColloquiumModalComponent } from '../colloquium-modal/colloquium-modal.component';

@Component({
  selector: 'app-course-colloquiums',
  templateUrl: './course-colloquiums.component.html',
  styleUrls: ['./course-colloquiums.component.css']
})
export class CourseColloquiumsComponent implements OnInit {

  constructor(private sessionService: SessionService, private colloquiumService: ColloquiumService, private dialogService: DialogService,
    private resultService: ColloquiumResultService, private router: Router, private toasterService: ToasterService) { }

  today = new Date().getTime();

  role: string;
  teacher = roles.teacher;
  student = roles.student;

  courseId: number;
  studentId: number;

  idSymbol = strings.id;

  colloquiums: Array<Colloquium>;

  ngOnInit() {
    this.refreshPage();
  }

  refreshPage() {
    this.role = this.sessionService.getUserRole(this.router.url);
    
    if(this.role == roles.student) {
      this.studentId = this.sessionService.getUserId(roles.student);
    }
    // get course id
    const urlItems = this.router.url.split('/');
    this.courseId = Number(urlItems[4]);

    this.colloquiumService.getByCourse(this.courseId).subscribe(colloquiums => {
      if(this.role == roles.student) {
        this.colloquiums = colloquiums;

        colloquiums.forEach(colloquium => {
          this.resultService.findByStudentAndColloquium(this.studentId, colloquium.id).subscribe(result => {
            colloquium.result = result;
          }, error => {
            this.toasterService.pop({type: 'error', title: 'Get Colloquium Result', body: error.status + ' ' + error.statusText });
          });
        });
      } else if (this.role == roles.teacher) {
        colloquiums.forEach(colloquium => {
          this.resultService.getByColloquium(colloquium.id).subscribe(results => {
            colloquium.results = results;
          }, error => {
            this.toasterService.pop({type: 'error', title: 'Get Colloquium Results', body: error.status + ' ' + error.statusText });
          });
        });
      }
    }, error => {
      this.toasterService.pop({type: 'error', title: 'Get Colloquiums', body: error.status + ' ' + error.statusText });
    });
  }

  add() {
    let disposable = this.dialogService.addDialog(ColloquiumModalComponent, {
      action: actions.add, 
      colloquium: new Colloquium()})
      .subscribe((created)=>{
          //We get dialog result
          if(created) {
            this.colloquiumService.create(this.courseId, created).subscribe(added => {
              this.toasterService.pop({type: 'success', title: 'Add Colloquium', body: '' });
              this.refreshPage();
            }, error => {
              this.toasterService.pop({type: 'error', title: 'Added Colloquium', body: error.status + ' ' + error.statusText });
            });
          }
          else {
            // do nothing, dialog closed
          }
      });
  }

  edit(colloquium: Colloquium) {
    let disposable = this.dialogService.addDialog(ColloquiumModalComponent, {
      action: actions.edit, 
      colloquium: new Colloquium()})
      .subscribe((edited)=>{
          //We get dialog result
          if(edited) {
            this.colloquiumService.update(this.courseId, edited).subscribe(updated => {
              this.toasterService.pop({type: 'success', title: 'Updated Colloquium', body: '' });
              this.refreshPage();
            }, error => {
              this.toasterService.pop({type: 'error', title: 'Update Colloquium', body: error.status + ' ' + error.statusText });
            });
          }
          else {
            // do nothing, dialog closed
          }
      });
  }

  delete(colloquiumId: number) {
    let disposable = this.dialogService.addDialog(ConfirmModalComponent, {
      header: 'Delete Colloquium', 
      text: 'Are you sure you want to delete this colloquium?'})
      .subscribe((isConfirmed)=>{
          //We get dialog result
          if(isConfirmed) {
            this.colloquiumService.delete(this.courseId, colloquiumId).subscribe(deleted => {
              this.toasterService.pop({type: 'success', title: 'Deleted Colloquium', body: '' });
              this.refreshPage();
            }, error => {
              this.toasterService.pop({type: 'error', title: 'Delete Colloquium', body: error.status + ' ' + error.statusText });
            });
          }
          else {
            // do nothing, dialog closed
          }
      });
  }

  submit(colloquiumId: number) {
    let disposable = this.dialogService.addDialog(EnterColloquiumModalComponent)
      .subscribe((file) => {
          //We get dialog result
          if(file != null) {
            // file is from the modal

            // upload file
            // create student document
            // create colloquiumResult




            // this.courseLessonService.create(this.courseId, added).subscribe(added => {
            //   this.toasterService.pop({type: 'success', title: 'Created New Course Lesson', body: '' });
            //   this.refreshPage();
            // }, error => {
            //   this.toasterService.pop({type: 'error', title: 'Create New Course Lesson', body: error.status + ' ' + error.statusText });
            // });
          }
          else {
            // do nothing, dialog closed
          }
      });
  }

  downloadDocument(document: StudentDocument) {
    // to do
  }

  grade(colloquiumResult: ColloquiumResult, colloquiumId: number) {
    let disposable = this.dialogService.addDialog(ColloquiumResultModalComponent)
      .subscribe((points) => {
          //We get dialog result
          if(points != null) {
            colloquiumResult.points = points;
            this.resultService.update(colloquiumId, colloquiumResult).subscribe(added => {
              this.toasterService.pop({type: 'success', title: 'Updated Colloquium Result', body: '' });
              this.refreshPage();
            }, error => {
              this.toasterService.pop({type: 'error', title: 'Update Colloquium Result', body: error.status + ' ' + error.statusText });
            });
          }
          else {
            // do nothing, dialog closed
          }
      });
  }

}
