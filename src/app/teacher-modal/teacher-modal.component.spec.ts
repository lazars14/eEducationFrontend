import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherModalComponent } from './teacher-modal.component';

describe('TeacherModalComponent', () => {
  let component: TeacherModalComponent;
  let fixture: ComponentFixture<TeacherModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
