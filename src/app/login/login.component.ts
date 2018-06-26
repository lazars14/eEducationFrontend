import { Component, OnInit } from '@angular/core';
import { SessionService } from '../_core';
import { UserService } from '../_services';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { roles } from './../_core/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private sessionService: SessionService,
    private userService: UserService, private toasterService: ToasterService) { }

  email: string;
  password: string;

  async ngOnInit() {
    const loggedIn = await this.sessionService.isUserLoggedIn();

    if (loggedIn === true) {
      const role = await this.sessionService.getLoggedUserRole();
      if (role === roles.admin) {
        this.router.navigate(['admin/dashboard/classes']);
      } else if (role === roles.teacher) {
        this.router.navigate(['teacher/dashboard/courses']);
      } else if (role === roles.student) {
        this.router.navigate(['student/dashboard/courses']);
      }
    }
  }

  onSubmit() {
    this.userService.login(this.email, this.password).subscribe(response => {
      console.log('response is ', response);
      const sessionObject = {
        token: response.token,
        email: response.user,
        id: response.id
      };

      this.sessionService.storeUser(sessionObject);

      // navigate to page
      if (response.role === roles.admin) {
        this.router.navigate(['admin/dashboard/classes']);
      } else if (response.role === roles.teacher) {
        this.router.navigate(['teacher/dashboard/courses']);
      } else if (response.role === roles.student) {
        this.router.navigate(['student/dashboard/courses']);
      }

    }, error => {
      this.toasterService.pop({type: 'error', title: 'Login User', body: error.status + ' ' + error.statusText });
    });
  }
}
