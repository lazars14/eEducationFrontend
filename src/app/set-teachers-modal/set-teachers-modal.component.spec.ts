import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetTeachersModalComponent } from './set-teachers-modal.component';

describe('SetTeachersModalComponent', () => {
  let component: SetTeachersModalComponent;
  let fixture: ComponentFixture<SetTeachersModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetTeachersModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetTeachersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
