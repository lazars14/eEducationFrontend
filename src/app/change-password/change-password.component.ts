import { Component, OnInit } from '@angular/core';
import { SessionService } from '../_core/index';
import { TeacherService, StudentService, UserService } from '../_services/index';
import { roles } from './../_core/constants';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private sessionService: SessionService, private teacherService: TeacherService,
    private studentService: StudentService, private userService: UserService,
    private router: Router, private toasterService: ToasterService) { }

  oldPassword: string;
  newPassword: string;
  repeatPassword: string;

  role: string;

  ngOnInit() {
    this.role = this.sessionService.getUserRole(this.router.url);
  }

  ok() {
    if (this.role === roles.admin) {
      this.userService.changePassword(this.oldPassword, this.newPassword, this.repeatPassword)
      .subscribe(newToken => {
        console.log('new token is ', newToken);
        this.sessionService.setUpdatedUserToken(String(newToken));
        this.toasterService.pop({type: 'success', title: 'Changed Admin Password', body: '' });
      }, error => {
        this.toasterService.pop({type: 'error', title: 'Change Admin Password', body: error.status + ' ' + error.statusText });
      });
    } else if (this.role === roles.teacher) {
      this.teacherService.changePassword(this.oldPassword, this.newPassword, this.repeatPassword)
      .subscribe(newToken => {
        console.log('new token is ', newToken);
        this.sessionService.setUpdatedUserToken(String(newToken));
        this.toasterService.pop({type: 'success', title: 'Changed Teacher Password', body: '' });
      }, error => {
        this.toasterService.pop({type: 'error', title: 'Change Teacher Password', body: error.status + ' ' + error.statusText });
      });
    } else if (this.role === roles.student) {
      this.studentService.changePassword(this.oldPassword, this.newPassword, this.repeatPassword)
      .subscribe(newToken => {
        console.log('new token is ', newToken);
        this.sessionService.setUpdatedUserToken(String(newToken));
        this.toasterService.pop({type: 'success', title: 'Changed Student Password', body: '' });
      }, error => {
        this.toasterService.pop({type: 'error', title: 'Change Student Password', body: error.status + ' ' + error.statusText });
      });
    }


  }

}
