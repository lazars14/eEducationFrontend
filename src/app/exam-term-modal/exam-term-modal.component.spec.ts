import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamTermModalComponent } from './exam-term-modal.component';

describe('ExamTermModalComponent', () => {
  let component: ExamTermModalComponent;
  let fixture: ComponentFixture<ExamTermModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamTermModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamTermModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
