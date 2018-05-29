import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamPeriodModalComponent } from './exam-period-modal.component';

describe('ExamPeriodModalComponent', () => {
  let component: ExamPeriodModalComponent;
  let fixture: ComponentFixture<ExamPeriodModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamPeriodModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamPeriodModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
