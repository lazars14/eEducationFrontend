import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseColloquiumsComponent } from './course-colloquiums.component';

describe('CourseColloquiumsComponent', () => {
  let component: CourseColloquiumsComponent;
  let fixture: ComponentFixture<CourseColloquiumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseColloquiumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseColloquiumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
