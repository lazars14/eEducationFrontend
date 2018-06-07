import { Component, OnInit } from '@angular/core';
import { Student, Course, StudentAttendsCourse } from '../_model/index';
import { StudentAttendsCourseService, StudentService } from '../_services/index';
import { ToasterService } from 'angular2-toaster';
import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { actions } from './../_core/constants';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  constructor(private studentService: StudentService, private sacService: StudentAttendsCourseService,
    private toasterService: ToasterService, private dialogService: DialogService) { }

  students: Array<Student>;
  courses: Array<Course>;

  selectedStudents = [];

  selectedCourseId: number;

  // class info
  name: string;
  numOfYears: number;

  ngOnInit() {
    this.refreshPage();
  }

  refreshPage() {
    
  }

  add() {
    // let disposable = this.dialogService.addDialog(LessonModalComponent, {
    //   action: actions.add, 
    //   courseLesson: new CourseLesson()})
    //   .subscribe((added) => {
    //       //We get dialog result
    //       if(added != null) {
    //         this.courseLessonService.create(this.courseId, added).subscribe(added => {
    //           this.toasterService.pop({type: 'success', title: 'Created New Course Lesson', body: '' });
    //           this.refreshPage();
    //         }, error => {
    //           this.toasterService.pop({type: 'error', title: 'Create New Course Lesson', body: error.status + ' ' + error.statusText });
    //         });
    //       }
    //       else {
    //         // do nothing, dialog closed
    //       }
    //   });
    // //We can close dialog calling disposable.unsubscribe();
    // //If dialog was not closed manually close it by timeout
    // setTimeout(() => {
    //     disposable.unsubscribe();
    // }, 10000);
  }

  edit(student: Student) {

  }

  delete(id: number) {
    let disposable = this.dialogService.addDialog(ConfirmModalComponent, {
      header: 'Delete Course Lesson', 
      text: 'Are you sure you want to delete this course lesson?'})
      .subscribe((isConfirmed)=>{
          //We get dialog result
          if(isConfirmed) {
            this.studentService.delete(id).subscribe(deleted => {
              this.toasterService.pop({type: 'success', title: 'Deleted Student', body: '' });
              this.refreshPage();
            }, error => {
              this.toasterService.pop({type: 'error', title: 'Delete Student', body: error.status + ' ' + error.statusText });
            });
          }
          else {
            // do nothing, dialog closed
          }
      });
    //We can close dialog calling disposable.unsubscribe();
    //If dialog was not closed manually close it by timeout
    setTimeout(() => {
        disposable.unsubscribe();
    }, 10000);
  }

  showStudentCourses(courses: Array<Course>) {

  }

  processChange(checked: boolean, student: Student) {
    if(checked) {
      // add student to selected list
      this.selectedStudents.push(student);
    } else {
      // remove from list of selected
      const index = this.selectedStudents.indexOf(student);
      this.selectedStudents.splice(index, 1);
    }
  }

  addCourseToStudents() {
    const course = this.courses.find(i => i.id === this.selectedCourseId);

    this.selectedStudents.forEach(student => {
      const sac = new StudentAttendsCourse();
      sac.student = student;
      sac.course = course;
      
      this.sacService.create(sac).subscribe(added => {
        this.toasterService.pop({type: 'success', title: 'Added Student Enrollment', body: '' });
        this.refreshPage();
      }, error => {
        this.toasterService.pop({type: 'error', title: 'Add Student Enrollment', body: error.status + ' ' + error.statusText });
      });
    });
  }

}
