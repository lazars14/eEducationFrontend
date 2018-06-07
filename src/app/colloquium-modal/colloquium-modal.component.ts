import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Colloquium } from '../_model/index';

export interface ColloquiumModel {
  action: string;
  colloquium: Colloquium;
}
@Component({
  selector: 'app-colloquium-modal',
  templateUrl: './colloquium-modal.component.html',
  styleUrls: ['./colloquium-modal.component.css']
})
export class ColloquiumModalComponent extends DialogComponent<ColloquiumModel, Colloquium> implements ColloquiumModel {

  constructor(dialogService: DialogService) { 
    super(dialogService);
  }

  action: string;
  colloquium: Colloquium;

  ngOnInit() {
  }

  get time() {
    if (this.colloquium.examDateTime) {

      const hour = this.colloquium.examDateTime.getHours();
      const minutes = this.colloquium.examDateTime.getMinutes();

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
    const month = this.colloquium.examDateTime.getMonth() + 1,
    day = this.colloquium.examDateTime.getDate(),
    year = this.colloquium.examDateTime.getFullYear();
    this.colloquium.examDateTime = new Date(month + '-' + day + '-' + year + ' ' + time);

    this.result = this.colloquium;
    this.close();
  }

  cancel() {
    this.result = null;
    this.close();
  }

}
