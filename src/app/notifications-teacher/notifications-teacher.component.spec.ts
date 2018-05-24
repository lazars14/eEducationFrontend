import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsTeacherComponent } from './notifications-teacher.component';

describe('NotificationsTeacherComponent', () => {
  let component: NotificationsTeacherComponent;
  let fixture: ComponentFixture<NotificationsTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
