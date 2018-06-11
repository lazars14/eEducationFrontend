import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Teacher, Rank } from '../_model/index';
import { RankService } from './../_services/index';
import { ToasterService } from 'angular2-toaster';
import { actions } from '../_core/constants';

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
  selectedRankId: any;

  add = actions.add;
  edit = actions.edit;

  constructor(dialogService: DialogService, private rankService: RankService, private toasterService: ToasterService) {
    super(dialogService);
  }

  ngOnInit() {
    this.rankService.findAll().subscribe(data => {
      this.ranks = data;

      if(this.action == actions.edit) {
        // set selected rank
        this.selectedRankId = this.teacher.rank.id;
      }
    }, error => {
      this.toasterService.pop({type: 'error', title: 'Get All Ranks', body: error.status + ' ' + error.statusText });
    });
  }

  ok() {
    const selectedRank = this.ranks.find(i => i.id === Number(this.selectedRankId));
    this.teacher.rank = selectedRank;

    this.result = this.teacher;
    this.close();
  }

  cancel() {
    this.result = null;
    this.close();
  }

}
