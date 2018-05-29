import { Component, OnInit } from '@angular/core';
import { SessionService } from '../_core/index';
import { GradeService } from '../_services/index';
import { roles } from './../_core/constants';
import { Grade } from '../_model/index';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {

  constructor(private sessionService: SessionService, private gradeService: GradeService) { }

  grades = Array<Grade>();
  average = 0;

  ngOnInit() {
    this.gradeService.getByStudent(roles.student).subscribe(data => {
      this.grades = data;
      let sum = 0;
      for (let index = 0; index < data.length; index++) {
        const grade = data[index];
        
        sum += grade.grade;

        if(index == data.length - 1){
          this.average = sum / data.length;
        }
      }
    }, error => {
      // notification
    });
  }

}
