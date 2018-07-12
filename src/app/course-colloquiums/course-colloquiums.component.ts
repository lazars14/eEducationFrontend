import { Component, OnInit } from '@angular/core';
import { Colloquium, StudentDocument, ColloquiumResult } from '../_model/index';
import { SessionService } from '../_core/index';
import { ColloquiumService, ColloquiumResultService, StudentDocumentService } from '../_services/index';
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
    private resultService: ColloquiumResultService, private router: Router, private toasterService: ToasterService,
    private documentService: StudentDocumentService) { }

  today = new Date();

  role: string;
  teacher = roles.teacher;
  student = roles.student;

  courseId: number;
  studentId: number;

  idSymbol = strings.id;

  colloquiums: Array<Colloquium>;

  selectedColloquium: any;

  ngOnInit() {
    this.role = this.sessionService.getUserRole(this.router.url);

    if (this.role === roles.student) {
      this.studentId = this.sessionService.getUserId();
    }
    this.refreshPage();
  }

  refreshPage() {
    this.selectedColloquium = null;
    // get course id
    const urlItems = this.router.url.split('/');
    this.courseId = Number(urlItems[4]);

    this.colloquiumService.getByCourse(this.courseId).subscribe(colloquiums => {
      this.colloquiums = colloquiums;
      if (this.role === roles.student) {
        this.colloquiums = colloquiums;

        this.colloquiums.forEach(colloquium => {
          colloquium.examDateTime = new Date(colloquium.examDateTime);
          this.resultService.findByStudentAndColloquium(this.studentId, colloquium.id).subscribe(result => {
            if(result.id) {
              colloquium['result'] = result;
            }
            
          }, error => {
            this.toasterService.pop({type: 'error', title: 'Get Colloquium Result', body: error.status + ' ' + error.statusText });
          });
        });
      } else if (this.role === roles.teacher) {
        colloquiums.forEach(colloquium => {
          colloquium.examDateTime = new Date(colloquium.examDateTime);
          this.resultService.getByColloquium(colloquium.id).subscribe(results => {
            colloquium['results'] = results;
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
      .subscribe((created) => {
          //We get dialog result
          if (created) {
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
      colloquium: colloquium})
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
            const formData = new FormData();
            formData.append('file', file);
            formData.append('studentId', String(this.studentId));
            this.resultService.create(colloquiumId, formData).subscribe(added => {
              this.toasterService.pop({type: 'success', title: 'Successfully Submitted Colloquium', body: '' });
              this.refreshPage();
            }, error => {
              this.toasterService.pop({type: 'error', title: 'Failed To Submit Colloquium', body: error.status + ' ' + error.statusText });
            });
          }
          else {
            // do nothing, dialog closed
          }
      });
  }

  downloadDocument(sDocument: StudentDocument) {
    this.documentService.download(this.studentId, sDocument.id).subscribe(file => {
      const blob = new Blob([file['_body']], { type: sDocument.mimeType });
      
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style.display = 'none';
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = sDocument.documentName;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    }, error => {
      this.toasterService.pop({type: 'error', title: 'Download Student Document File By Id', body: error.status + ' ' + error.statusText });
    });
  }

  grade(colloquiumResult: ColloquiumResult) {
    let disposable = this.dialogService.addDialog(ColloquiumResultModalComponent)
      .subscribe((points) => {
          //We get dialog result
          if(points != null) {
            colloquiumResult.points = points;
            console.log('result is ', colloquiumResult);
            this.resultService.update(this.selectedColloquium.id, colloquiumResult).subscribe(added => {
              this.toasterService.pop({type: 'success', title: 'Updated Colloquium Result', body: '' });
              this.refreshPage();
            }, error => {
              console.log('error is ', error);
              this.toasterService.pop({type: 'error', title: 'Update Colloquium Result', body: error.status + ' ' + error.statusText });
            });
          }
          else {
            // do nothing, dialog closed
          }
      });
  }

}
