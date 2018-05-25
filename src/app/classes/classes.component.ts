import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  moreInfo(id: number) {
    this.router.navigate([id]);
  }
}
