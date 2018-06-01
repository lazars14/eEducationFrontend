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

  get time() {
    if (this.examTerm.examDate) {

      const hour = this.examTerm.examDate.getHours();
      const minutes = this.examTerm.examDate.getMinutes();

      let hourStr, minStr;

      if (hour < 10) {
        hourStr = '0' + hour;
      } else {
        hourStr = hour.toString();
      }

      if (minutes < 10) {
        minStr = '0' + minutes;
      } else {
        hourStr = hour.toString();
      }

      return hourStr + ':' + minStr;
    }
  }

  ok(time) {
    const month = this.examTerm.examDate.getMonth() + 1,
    day = this.examTerm.examDate.getDate(),
    year = this.examTerm.examDate.getFullYear();
    this.examTerm.examDate = new Date(month + '-' + day + '-' + year + ' ' + time);

    this.result = this.examTerm;
    this.close();
  }

  cancel() {
    this.result = null;
    this.close();
  }

}
