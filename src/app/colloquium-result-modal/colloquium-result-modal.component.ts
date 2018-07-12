import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

export interface ColloquiumResultModel {

}
@Component({
  selector: 'app-colloquium-result-modal',
  templateUrl: './colloquium-result-modal.component.html',
  styleUrls: ['./colloquium-result-modal.component.css']
})
export class ColloquiumResultModalComponent extends DialogComponent<ColloquiumResultModel, number> implements ColloquiumResultModel {

  constructor(dialogService: DialogService) { 
    super(dialogService);
  }

  points: number;

  ngOnInit() {
  }

  ok() {
    this.result = this.points;
    this.close();
  }

  cancel() {
    this.result = null;
    this.close();
  }
}
