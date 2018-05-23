import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamEntriesComponent } from './exam-entries.component';

describe('ExamEntriesComponent', () => {
  let component: ExamEntriesComponent;
  let fixture: ComponentFixture<ExamEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
