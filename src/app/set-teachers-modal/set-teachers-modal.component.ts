import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { TeacherService } from '../_services/index';
import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';
import { Teacher } from '../_model/index';

export interface SetTeachersModel {
  courseId: number;
}
@Component({
  selector: 'app-set-teachers-modal',
  templateUrl: './set-teachers-modal.component.html',
  styleUrls: ['./set-teachers-modal.component.css']
})
export class SetTeachersModalComponent extends DialogComponent<SetTeachersModel, Object> implements SetTeachersModel, OnInit {

  constructor(private toasterService: ToasterService, private teacherService: TeacherService, dialogService: DialogService) {
    super(dialogService);
  }

  courseId: number;

  teachers = [];

  currentTeachers = [];

  addedTeachers = [];
  removedTeachers = [];

  ngOnInit() {
    this.teacherService.getByCourse(this.courseId).subscribe(teachers => {
      this.currentTeachers = teachers;
    }, error => {
      this.toasterService.pop({type: 'error', title: 'Get Teachers For Course', body: error.status + ' ' + error.statusText });
    });

    this.teacherService.findAll().subscribe(data => {
      this.teachers = data;
    }, error => {
      this.toasterService.pop({type: 'error', title: 'Get All Teachers', body: error.status + ' ' + error.statusText });
    });
  }

  isSelected(teacherId: number) {
    const found = this.currentTeachers.find(i => i.id === teacherId);

    if (found) {
      return true;
    }

    return false;
  }

  set(teacher: Teacher) {
    this.currentTeachers.push(teacher);
    this.addedTeachers.push(teacher);
  }

  remove(teacher: Teacher) {
    
    // if contained in added teachers don't put in removed
    const found = this.addedTeachers.find(i => i.id === teacher.id);

    if (found) {
      const index = this.addedTeachers.indexOf(teacher);
      this.addedTeachers.splice(index, 1);
    } else {
      this.removedTeachers.push(teacher);
    }

    // remove from current teachers
    const index = this.currentTeachers.indexOf(teacher);
    this.currentTeachers.splice(index, 1);
  }

  ok() {
    this.result = {added: this.addedTeachers, removed: this.removedTeachers};
    this.close();
  }

  cancel() {
    this.result = null;
    this.close();
  }

}
