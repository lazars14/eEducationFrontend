import { Component, OnInit } from '@angular/core';
import { ColloquiumResult, StudentExamEntry, Grade } from '../_model/index';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { ColloquiumService, ColloquiumResultService } from './../_services/index';
import { ToasterService } from 'angular2-toaster';

export interface GradingModel {
  examEntry: StudentExamEntry;
}
@Component({
  selector: 'app-grading-modal',
  templateUrl: './grading-modal.component.html',
  styleUrls: ['./grading-modal.component.css']
})
export class GradingModalComponent extends DialogComponent<GradingModel, Grade> implements GradingModel, OnInit {

  constructor(dialogService: DialogService, private toasterService: ToasterService,
    private colloquiumService: ColloquiumService, private resultService: ColloquiumResultService) {
    super(dialogService);
  }

  examEntry: StudentExamEntry;

  colloquiumResults: Array<ColloquiumResult>;
  
  percent: number;
  grade: number;
  points = 0;
  maxPoints = 0;

  ngOnInit() {
    this.colloquiumService.getByCourse(this.examEntry.examTerm.course.id).subscribe(colloquiums => {
      colloquiums.forEach(colloquium => {
        this.resultService.getByColloquium(colloquium.id).subscribe(results => {
          this.colloquiumResults = results;
          for (let index = 0; index < results.length; index++) {
            const element = results[index];
            this.points += element.points;
            this.maxPoints += element.colloquium.maxPoints;

            if(index == results.length - 1) {
              this.percent = this.points / this.maxPoints * 100;
            }
          }
        }, error => {
          this.toasterService.pop({type: 'error', title: 'Get Colloquium Results', body: error.status + ' ' + error.statusText });
        });
      });
    }, error => {
      this.toasterService.pop({type: 'error', title: 'Get Colloquiums', body: error.status + ' ' + error.statusText });
    });
  }

  ok() {
    const newGrade = new Grade();
    newGrade.points = this.points;
    newGrade.grade = this.grade;
    newGrade.course = this.examEntry.examTerm.course;
    newGrade.student = this.examEntry.student;

    this.result = newGrade;
    this.close();
  }

  cancel() {
    this.result = null;
    this.close();
  }

}
