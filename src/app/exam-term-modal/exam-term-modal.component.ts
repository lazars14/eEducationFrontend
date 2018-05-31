import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { ExamTerm } from '../_model/index';

export interface ExamTermModel {
  action: string;
  examTerm: ExamTerm;
}
@Component({
  selector: 'app-exam-term-modal',
  templateUrl: './exam-term-modal.component.html',
  styleUrls: ['./exam-term-modal.component.css']
})
export class ExamTermModalComponent extends DialogComponent<ExamTermModel, ExamTerm> implements ExamTermModel {

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  action: string;
  examTerm: ExamTerm;

  ok() {
    this.result = this.examTerm;
    this.close();
  }

  cancel() {
    this.result = null;
    this.close();
  }

}
