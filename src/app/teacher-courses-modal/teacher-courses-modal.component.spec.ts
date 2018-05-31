import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCoursesModalComponent } from './teacher-courses-modal.component';

describe('TeacherCoursesModalComponent', () => {
  let component: TeacherCoursesModalComponent;
  let fixture: ComponentFixture<TeacherCoursesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherCoursesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherCoursesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
