import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { ExamPeriod } from '../_model/index';
import { StudentService, ColloquiumService } from '../_services/index';

export interface EnterColloquiumModel {

}

@Component({
  selector: 'app-enter-colloquium-modal',
  templateUrl: './enter-colloquium-modal.component.html',
  styleUrls: ['./enter-colloquium-modal.component.css']
})
export class EnterColloquiumModalComponent  extends DialogComponent<EnterColloquiumModel, any> implements EnterColloquiumModel, OnInit {

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  document: any;

  ngOnInit() {
    
  }

  ok() {
    this.result = this.document;
    this.close();
  }

  cancel() {
    this.result = null;
    this.close();
  }

}
