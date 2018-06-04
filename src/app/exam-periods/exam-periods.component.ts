import { Component, OnInit } from '@angular/core';
import { ExamPeriod } from '../_model/index';
import { ToasterService } from 'angular2-toaster';
import { DialogService } from 'ng2-bootstrap-modal';
import { ExamPeriodService, ExamTermService } from '../_services/index';
import { ExamTerm } from '../_model/examTerm.model';
import { actions, strings } from './../_core/constants';
import { ExamPeriodModalComponent } from '../exam-period-modal/exam-period-modal.component';
import { ExamTermModalComponent } from '../exam-term-modal/exam-term-modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';


@Component({
  selector: 'app-exam-periods',
  templateUrl: './exam-periods.component.html',
  styleUrls: ['./exam-periods.component.css']
})
export class ExamPeriodsComponent implements OnInit {

  constructor(private toasterService: ToasterService, private dialogService: DialogService, 
    private examPeriodService: ExamPeriodService, private examTermService: ExamTermService) { }

  examPeriods: Array<ExamPeriod>;

  idSymbol = strings.id;

  ngOnInit() {
    this.refreshPage();
  }

  refreshPage() {
    this.examPeriodService.findAll().subscribe(data => {
      this.examPeriods = data;
      this.examPeriods.forEach(examPeriod => {
        this.examTermService.getByExamPeriod(examPeriod.id).subscribe(examTerms => {
          examPeriod['examTerms'] = examTerms;
        }, error => {
          this.toasterService.pop({type: 'error', title: 'Get Exam Terms For Exam Period', body: error.status + ' ' + error.statusText });
        });
      });
    }, error => {
      this.toasterService.pop({type: 'error', title: 'Get All Exam Periods', body: error.status + ' ' + error.statusText });
    });
  }

  addExamPeriod() {
    let disposable = this.dialogService.addDialog(ExamPeriodModalComponent, {
      action: actions.add, 
      examPeriod: new ExamPeriod()})
      .subscribe((added) => {
          //We get dialog result
          if(added != null) {
            this.examPeriodService.create(added).subscribe(added => {
              this.toasterService.pop({type: 'success', title: 'Created New Exam Period', body: '' });
              this.refreshPage();
            }, error => {
              this.toasterService.pop({type: 'error', title: 'Create New Exam Period', body: error.status + ' ' + error.statusText });
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

  editExamPeriod(examPeriod: ExamPeriod) {
    let disposable = this.dialogService.addDialog(ExamPeriodModalComponent, {
      action: actions.add, 
      examPeriod: examPeriod})
      .subscribe((edited) => {
          //We get dialog result
          if(edited != null) {
            this.examPeriodService.update(edited).subscribe(updated => {
              this.toasterService.pop({type: 'success', title: 'Updated Exam Period', body: '' });
              this.refreshPage();
            }, error => {
              this.toasterService.pop({type: 'error', title: 'Update Exam Period', body: error.status + ' ' + error.statusText });
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

  deleteExamPeriod(id: number) {
    let disposable = this.dialogService.addDialog(ConfirmModalComponent, {
      header: 'Delete Exam Period', 
      text: 'Are you sure you want to delete this exam period?'})
      .subscribe((isConfirmed)=>{
          //We get dialog result
          if(isConfirmed) {
            this.examPeriodService.delete(id).subscribe(deleted => {
              this.toasterService.pop({type: 'success', title: 'Deleted Exam Period', body: '' });
              this.refreshPage();
            }, error => {
              this.toasterService.pop({type: 'error', title: 'Delete Exam Period', body: error.status + ' ' + error.statusText });
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

  addExamTerm(examPeriodId: number) {
    let disposable = this.dialogService.addDialog(ExamTermModalComponent, {
      action: actions.add,
      examTerm: new ExamTerm()})
      .subscribe((added) => {
          //We get dialog result
          if(added != null) {
            this.examTermService.create(examPeriodId, added).subscribe(added => {
              this.toasterService.pop({type: 'success', title: 'Created New Exam Term', body: '' });
              this.refreshPage();
            }, error => {
              this.toasterService.pop({type: 'error', title: 'Create New Exam Term', body: error.status + ' ' + error.statusText });
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

  editExamTerm(examPeriodId: number, examTerm: ExamTerm) {
    let disposable = this.dialogService.addDialog(ExamTermModalComponent, {
      action: actions.add, 
      examTerm: new ExamTerm()})
      .subscribe((edited) => {
          //We get dialog result
          if(edited != null) {
            this.examTermService.update(examPeriodId, edited).subscribe(updated => {
              this.toasterService.pop({type: 'success', title: 'Updated Exam Term', body: '' });
              this.refreshPage();
            }, error => {
              this.toasterService.pop({type: 'error', title: 'Update Exam Term', body: error.status + ' ' + error.statusText });
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

  deleteExamTerm(examPeriodId: number, id: number) {
    let disposable = this.dialogService.addDialog(ConfirmModalComponent, {
      header: 'Delete Exam Term', 
      text: 'Are you sure you want to delete this exam term?'})
      .subscribe((isConfirmed)=>{
          //We get dialog result
          if(isConfirmed) {
            this.examTermService.delete(examPeriodId, id).subscribe(deleted => {
              this.toasterService.pop({type: 'success', title: 'Deleted Exam Term', body: '' });
              this.refreshPage();
            }, error => {
              this.toasterService.pop({type: 'error', title: 'Delete Exam Term', body: error.status + ' ' + error.statusText });
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
