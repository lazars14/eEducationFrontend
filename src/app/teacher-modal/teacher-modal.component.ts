import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Teacher, Rank } from '../_model/index';
import { RankService } from './../_services/index';
import { ToasterService } from 'angular2-toaster';

export interface TeacherModel {
  action: string;
  teacher: Teacher;
}
@Component({
  selector: 'app-teacher-modal',
  templateUrl: './teacher-modal.component.html',
  styleUrls: ['./teacher-modal.component.css']
})
export class TeacherModalComponent extends DialogComponent<TeacherModel, Teacher> implements TeacherModel, OnInit {

  action: string;
  teacher: Teacher;
  
  ranks: Array<Rank>;

  constructor(dialogService: DialogService, private rankService: RankService, private toasterService: ToasterService) {
    super(dialogService);
  }

  ngOnInit() {
    this.rankService.findAll().subscribe(data => {
      this.ranks = data;
    }, error => {
      this.toasterService.pop({type: 'error', title: 'Get All Ranks', body: error.status + ' ' + error.statusText });
    });
  }

  ok() {
    this.result = this.teacher;
    this.close();
  }

  cancel() {
    this.result = null;
    this.close();
  }

}
