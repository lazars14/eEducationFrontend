import { Component, OnInit } from '@angular/core';
import { roles } from './../_core/constants';
import { SessionService } from '../_core/index';
import { Router } from '@angular/router';
import { ExamTerm, StudentExamEntry } from '../_model/index';
import { StudentExamEntryService, StudentService } from '../_services/index';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-exam-entries',
  templateUrl: './exam-entries.component.html',
  styleUrls: ['./exam-entries.component.css']
})
export class ExamEntriesComponent implements OnInit {

  constructor(private router: Router, private sessionService: SessionService, private examEntryService: StudentExamEntryService, 
    private toasterService: ToasterService, private studentService: StudentService) { }

  today = new Date().getTime();

  deadlineDate: number;

  role: string;

  teacher = roles.teacher;
  student = roles.student;

  ngOnInit() {
    // add 3 days to today
    this.deadlineDate = this.today + 259200000; 

    this.role = this.sessionService.getUserRole(this.router.url);

    this.refreshPage();
  }

  refreshPage() {

  }

  addExamEntry(examTerm: ExamTerm) {
    const studentId = this.sessionService.getUserId(roles.student);

    this.studentService.findById(Number(studentId)).subscribe(student => {
      const newExamEntry = new StudentExamEntry();
      newExamEntry.examTerm = examTerm;
      newExamEntry.student = student;

      this.examEntryService.create(newExamEntry).subscribe(addedEntry => {

      }, error => {
        this.toasterService.pop({type: 'error', title: 'Create Exam Entry', body: error.status + ' ' + error.statusText });
      });

    }, error => {
      this.toasterService.pop({type: 'error', title: 'Find Student By Id', body: error.status + ' ' + error.statusText });
    });
  }

  deleteExamEntry(examEntryId: number) {
    this.examEntryService.delete(examEntryId).subscribe(deleted => {
      this.toasterService.pop({type: 'success', title: 'Deleted Exam Entry', body: '' });
      this.refreshPage();
    }, error => {
      this.toasterService.pop({type: 'error', title: 'Delete Exam Entry', body: error.status + ' ' + error.statusText });
    });
  }

  grade(examEntry: StudentExamEntry) {

  }

}
