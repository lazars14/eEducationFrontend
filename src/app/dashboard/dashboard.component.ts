import { Component, OnInit } from '@angular/core';
import { SessionService } from './../_core/index';
import { roles } from './../_core/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private sessionService: SessionService, private router: Router) { }

  role: string;

  admin = roles.admin;
  teacher = roles.teacher;
  student = roles.student;

  ngOnInit() {
    this.role = this.sessionService.getUserRole(this.router.url);
  }

}
