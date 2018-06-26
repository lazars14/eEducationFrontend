import { Component, OnInit } from '@angular/core';
import { SessionService } from '../_core/index';
import { TeacherService, StudentService, UserService } from '../_services/index';
import { roles } from './../_core/constants';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {

  constructor(private sessionService: SessionService, private teacherService: TeacherService,
    private studentService: StudentService, private userService: UserService,
    private router: Router, private toasterService: ToasterService) { }

  oldEmail: string;
  newEmail: string;

  role: string;

  ngOnInit() {
    this.role = this.sessionService.getUserRole(this.router.url);
  }

  ok() {
    if (this.role === roles.admin) {
      this.userService.changeEmail(this.oldEmail, this.newEmail).subscribe(status => {
        this.toasterService.pop({type: 'success', title: 'Changed Admin Email', body: '' });
        this.sessionService.destroyUser();
        this.router.navigate(['/']);
      }, error => {
        this.toasterService.pop({type: 'error', title: 'Change Admin Email', body: error.status + ' ' + error.statusText });
      });
    } else if (this.role === roles.teacher) {
      this.teacherService.changeEmail(this.oldEmail, this.newEmail).subscribe(newToken => {
        this.toasterService.pop({type: 'success', title: 'Changed Teacher Email', body: '' });
        this.sessionService.destroyUser();
        this.router.navigate(['/']);
      }, error => {
        this.toasterService.pop({type: 'error', title: 'Change Teacher Email', body: error.status + ' ' + error.statusText });
      });
    } else if (this.role === roles.student) {
      this.studentService.changeEmail(this.oldEmail, this.newEmail).subscribe(newToken => {
        this.toasterService.pop({type: 'success', title: 'Changed Student Email', body: '' });
        this.sessionService.destroyUser();
        this.router.navigate(['/']);
      }, error => {
        this.toasterService.pop({type: 'error', title: 'Change Student Email', body: error.status + ' ' + error.statusText });
      });
    }


  }

}
