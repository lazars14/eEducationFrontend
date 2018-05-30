import { Component, OnInit } from '@angular/core';
import { CollegeDirection } from '../_model/index';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

export interface ClassModel {
  action: string;
  class: CollegeDirection;
}
@Component({
  selector: 'app-class-modal',
  templateUrl: './class-modal.component.html',
  styleUrls: ['./class-modal.component.css']
})
export class ClassModalComponent extends DialogComponent<ClassModel, CollegeDirection> implements ClassModel {

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  action: string;
  class: CollegeDirection;

  ok() {
    this.result = this.class;
    this.close();
  }

  cancel() {
    this.result = null;
    this.close();
  }

}
