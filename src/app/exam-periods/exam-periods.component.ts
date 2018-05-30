import { Component, OnInit } from '@angular/core';
import { ExamPeriod } from '../_model/index';
import { ToasterService } from 'angular2-toaster';
import { DialogService } from 'ng2-bootstrap-modal';
import { ExamPeriodService, ExamTermService } from '../_services/index';
import { ExamTerm } from '../_model/examTerm.model';


@Component({
  selector: 'app-exam-periods',
  templateUrl: './exam-periods.component.html',
  styleUrls: ['./exam-periods.component.css']
})
export class ExamPeriodsComponent implements OnInit {

  constructor(private toasterService: ToasterService, private dialogService: DialogService, 
    private examPeriodService: ExamPeriodService, private examTermService: ExamTermService) { }

  examPeriods: Array<ExamPeriod>;

  ngOnInit() {
    this.refreshPage();
  }

  refreshPage() {

  }

  addExamPeriod() {
    
  }

  editExamPeriod(examPeriod: ExamPeriod) {

  }

  deleteExamPeriod(id: number) {

  }

  addExamTerm() {

  }

  editExamTerm(examTerm: ExamTerm) {

  }

  deleteExamTerm(id: number) {
    
  }



}
