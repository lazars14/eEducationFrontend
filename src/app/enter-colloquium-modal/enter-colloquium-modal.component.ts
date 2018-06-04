import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { ExamPeriod } from '../_model/index';
import { StudentService, ColloquiumService } from '../_services/index';

export interface EnterColloquiumModel {
  colloquiumId: number;
  studentId: number;
}

@Component({
  selector: 'app-enter-colloquium-modal',
  templateUrl: './enter-colloquium-modal.component.html',
  styleUrls: ['./enter-colloquium-modal.component.css']
})
export class EnterColloquiumModalComponent  extends DialogComponent<EnterColloquiumModel, ExamPeriod> implements EnterColloquiumModel, OnInit {

  constructor(dialogService: DialogService, private studentService: StudentService, private colloquiumService: ColloquiumService) {
    super(dialogService);
  }

  colloquiumId: number;
  studentId: number;

  ngOnInit() {
    
  }

}
