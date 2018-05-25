import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseNotificationsComponent } from './course-notifications.component';

describe('CourseNotificationsComponent', () => {
  let component: CourseNotificationsComponent;
  let fixture: ComponentFixture<CourseNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
