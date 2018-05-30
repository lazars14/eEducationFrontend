import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface ConfirmModel {
  header: string;
  text: string;
}

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})

export class ConfirmModalComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  header: string;
  text: string;

  ok() {
    this.result = true;
    this.close();
  }

  cancel() {
    this.close();
  }

}
