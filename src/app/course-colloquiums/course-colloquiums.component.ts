import { Component, OnInit } from '@angular/core';
import { Colloquium } from '../_model/index';
import { SessionService } from '../_core/index';
import { ColloquiumService, ColloquiumResultService } from '../_services/index';
import { roles } from './../_core/constants';

@Component({
  selector: 'app-course-colloquiums',
  templateUrl: './course-colloquiums.component.html',
  styleUrls: ['./course-colloquiums.component.css']
})
export class CourseColloquiumsComponent implements OnInit {

  constructor(private sessionService: SessionService, private colloquiumService: ColloquiumService,
    private resultService: ColloquiumResultService) { }

  today = new Date().getTime();

  colloquiums: Array<Colloquium>;

  ngOnInit() {
  }

  submit(colloquiumId: number) {
    const studentId = this.sessionService.getUserId(roles.student);

    this.resultService.findByStudentAndColloquium(studentId, colloquiumId).subscribe(result => {
      if (result == null) {
        // open dialog
      } else {
        // student allowed to submit only once alert
        
      }
    }, error => {

    });
  }

}
