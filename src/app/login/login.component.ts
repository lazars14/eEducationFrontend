import { Component, OnInit } from '@angular/core';
import { SessionService } from '../_core';
import { UserService } from '../_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private sessionService: SessionService, private userService: UserService) { }

  email: string;
  password: string;

  ngOnInit() {
  }

  onSubmit() {
    this.userService.login(this.email, this.password).subscribe(response => {
      console.log('response is ', response);
    }, error => {
      console.log('error is ', error);
    });
  }
}
