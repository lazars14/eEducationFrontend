import {
  Component,
  OnInit
} from '@angular/core';
import {
  Student,
  Course,
  StudentAttendsCourse,
  CollegeDirection
} from '../_model/index';
import {
  StudentAttendsCourseService,
  StudentService,
  CollegeDirectionService,
  CourseService
} from '../_services/index';
import {
  ToasterService
} from 'angular2-toaster';
import {
  DialogService,
  DialogOptions
} from 'ng2-bootstrap-modal';
import {
  ConfirmModalComponent
} from '../confirm-modal/confirm-modal.component';
import {
  actions
} from './../_core/constants';
import {
  StudentModalComponent
} from '../student-modal/student-modal.component';
import {
  Router
} from '@angular/router';
import {
  StudentCoursesModalComponent
} from '../student-courses-modal/student-courses-modal.component';
import {
  StudentTransferModalComponent
} from '../student-transfer-modal/student-transfer-modal.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  constructor(private studentService: StudentService, private sacService: StudentAttendsCourseService,
    private toasterService: ToasterService, private dialogService: DialogService,
    private classService: CollegeDirectionService, private router: Router,
    private courseService: CourseService) {}

  students: Array < Student > ;
  courses: Array < Course > ;

  studentsBackup: Array < Student > ;

  selectedStudents = [];

  selectedCourseId: number;
  selectedCourse: Course;

  addCourse: boolean;

  coursesAdd: any;
  coursesRemove: any;

  direction: CollegeDirection;

  // class info
  name: string;
  numOfYears: number;

  ngOnInit() {
    this.refreshPage();
  }

  refreshPage() {
    // get class id
    const urlItems = this.router.url.split('/');
    const classId = Number(urlItems[4]);

    // load class
    this.classService.findById(classId).subscribe(direction => {
      this.direction = direction;

      this.name = direction.name;
      this.numOfYears = direction.numOfYears;

      this.studentService.getByClassId(this.direction.id).subscribe(students => {
        this.students = students;

        for (let i = 0; i < this.students.length; i++) {
          const student = this.students[i];
          
          this.courseService.getByStudent(student.id).subscribe(courses => {
            student['courses'] = courses;
            if(i == this.students.length - 1) {
              this.studentsBackup = _.cloneDeep(students);
              this.toasterService.pop({
                type: 'info',
                title: 'Loaded Student Data',
                body: ''
              });
            }
          }, error => {
            this.toasterService.pop({
              type: 'error',
              title: 'Get Courses For Student',
              body: error.status + ' ' + error.statusText
            });
          });

        }
        
      }, error => {
        this.toasterService.pop({
          type: 'error',
          title: 'Get Students By Class',
          body: error.status + ' ' + error.statusText
        });
      });
    }, error => {
      this.toasterService.pop({
        type: 'error',
        title: 'Get Class By Id',
        body: error.status + ' ' + error.statusText
      });
    });

    this.courseService.findAll().subscribe(courses => {
      this.courses = courses;
    }, error => {
      this.toasterService.pop({
        type: 'error',
        title: 'Get All Courses',
        body: error.status + ' ' + error.statusText
      });
    });

  }

  add() {
    let disposable = this.dialogService.addDialog(StudentModalComponent, {
        action: actions.add,
        student: new Student()
      })
      .subscribe((added) => {
        //We get dialog result
        if (added != null) {
          added.collegeDirection = this.direction;
          this.studentService.create(added).subscribe(created => {
            this.toasterService.pop({
              type: 'success',
              title: 'Created New Student',
              body: ''
            });
            this.refreshPage();
          }, error => {
            this.toasterService.pop({
              type: 'error',
              title: 'Create New Student',
              body: error.status + ' ' + error.statusText
            });
          });
        } else {
          // do nothing, dialog closed
        }
      });
  }

  edit(student: Student) {
    let disposable = this.dialogService.addDialog(StudentModalComponent, {
        action: actions.edit,
        student: _.cloneDeep(student)
      })
      .subscribe((edited) => {
        //We get dialog result
        if (edited != null) {
          this.studentService.update(edited).subscribe(updated => {
            this.toasterService.pop({
              type: 'success',
              title: 'Updated Student',
              body: ''
            });
            this.refreshPage();
          }, error => {
            this.toasterService.pop({
              type: 'error',
              title: 'Update Student',
              body: error.status + ' ' + error.statusText
            });
          });
        } else {
          // do nothing, dialog closed
        }
      });
  }

  delete(id: number) {
    let disposable = this.dialogService.addDialog(ConfirmModalComponent, {
        header: 'Delete Course Lesson',
        text: 'Are you sure you want to delete this course lesson?'
      })
      .subscribe((isConfirmed) => {
        //We get dialog result
        if (isConfirmed) {
          this.studentService.delete(id).subscribe(deleted => {
            this.toasterService.pop({
              type: 'success',
              title: 'Deleted Student',
              body: ''
            });
            this.refreshPage();
          }, error => {
            this.toasterService.pop({
              type: 'error',
              title: 'Delete Student',
              body: error.status + ' ' + error.statusText
            });
          });
        } else {
          // do nothing, dialog closed
        }
      });
  }

  showStudentCourses(student: Student) {
    let disposable = this.dialogService.addDialog(StudentCoursesModalComponent, {
        name: student.lastname + ' ' + student.firstname + ' ' + student.indexNumber,
        courses: student['courses']
      })
      .subscribe((result) => {
        //We get dialog result
        if (result != null) {
          // read only, do nothing
        } else {
          // do nothing, dialog closed
        }
      });
  }

  processChange(checked: boolean, student: Student) {
    if (checked) {
      // check if student in list already
      const found = this.selectedStudents.find(i => i.id == student.id);

      if(!found) {
        // add student to selected list
        this.selectedStudents.push(student);
      }

    } else {
      // remove from list of selected
      const index = this.selectedStudents.indexOf(student);
      this.selectedStudents.splice(index, 1);
    }
  }

  processCourseChange() {
    this.resetStudents();
  }

  prepareAdd() {
    this.addCourse = true;

    this.coursesAdd = true;
    this.coursesRemove = false;

    this.students = [];

    this.selectedCourse = this.courses.find(i => i.id === this.selectedCourseId);

    this.studentsBackup.forEach(student => {
      const studentCourses = student['courses'];

      if (studentCourses) {
        const contains = studentCourses.find(i => this.selectedCourseId == i.id);
        if (!contains) {
          this.students.push(student);
        }
      } else {
        this.students.push(student);
      }

    });
  }

  prepareRemove() {
    this.addCourse = false;

    this.coursesRemove = true;
    this.coursesAdd = false;

    this.students = [];

    this.selectedCourse = this.courses.find(i => i.id === this.selectedCourseId);

    this.studentsBackup.forEach(student => {
      const studentCourses = student['courses'];

      if (studentCourses) {
        const contains = studentCourses.find(i => this.selectedCourseId == i.id);
        if (contains) {
          this.students.push(student);
        }
      } else {
        this.students.push(student);
      }
    });
  }

  resetStudents() {
    this.coursesAdd = false;
    this.coursesRemove = false;
    this.students = _.cloneDeep(this.studentsBackup);
    this.selectedStudents = [];
  }

  addOrRemoveCourseForStudents() {
    if (this.addCourse) {
      // batch add
      this.sacService.batchAdd(this.selectedCourseId, this.selectedStudents).subscribe(finished => {
        this.toasterService.pop({
          type: 'success',
          title: 'Added Student Enrollment',
          body: ''
        });
        this.refreshPage();
        this.resetStudents();
      }, error => {
        this.toasterService.pop({
          type: 'error',
          title: 'Batch Enrollment',
          body: error.status + ' ' + error.statusText
        });
      });
    } else {
      // batch remove
      this.sacService.batchRemove(this.selectedCourseId, this.selectedStudents).subscribe(finished => {
        this.toasterService.pop({
          type: 'success',
          title: 'Added Student Enrollment',
          body: ''
        });
        this.refreshPage();
        this.resetStudents();
      }, error => {
        this.toasterService.pop({
          type: 'error',
          title: 'Batch Enrollment',
          body: error.status + ' ' + error.statusText
        });
      });
    }


  }

  addCourseToStudents() {
    const course = this.courses.find(i => i.id === this.selectedCourseId);

    this.selectedStudents.forEach(student => {
      const sac = new StudentAttendsCourse();
      sac.student = student;
      sac.course = course;

      this.sacService.create(sac).subscribe(added => {
        this.toasterService.pop({
          type: 'success',
          title: 'Added Student Enrollment',
          body: ''
        });
        this.refreshPage();
      }, error => {
        this.toasterService.pop({
          type: 'error',
          title: 'Add Student Enrollment',
          body: error.status + ' ' + error.statusText
        });
      });
    });
  }

  removeCourseFromStudents() {
    const course = this.courses.find(i => i.id === this.selectedCourseId);

    this.selectedStudents.forEach(student => {
      const sac = new StudentAttendsCourse();
      sac.student = student;
      sac.course = course;

      this.sacService.create(sac).subscribe(added => {
        this.toasterService.pop({
          type: 'success',
          title: 'Added Student Enrollment',
          body: ''
        });
        this.refreshPage();
      }, error => {
        this.toasterService.pop({
          type: 'error',
          title: 'Add Student Enrollment',
          body: error.status + ' ' + error.statusText
        });
      });
    });
  }

  transfer(student: Student) {
    let disposable = this.dialogService.addDialog(StudentTransferModalComponent, {
        student: student
      })
      .subscribe((edited) => {
        //We get dialog result
        if (edited != null) {
          this.studentService.update(edited).subscribe(updated => {
            this.toasterService.pop({
              type: 'success',
              title: 'Transfered Student',
              body: ''
            });
            this.refreshPage();
          }, error => {
            this.toasterService.pop({
              type: 'error',
              title: 'Transfer Student',
              body: error.status + ' ' + error.statusText
            });
          });
        } else {
          // do nothing, dialog closed
        }
      });
  }


}