import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCoursesModalComponent } from './student-courses-modal.component';

describe('StudentCoursesModalComponent', () => {
  let component: StudentCoursesModalComponent;
  let fixture: ComponentFixture<StudentCoursesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCoursesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCoursesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
