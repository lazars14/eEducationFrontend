import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradingModalComponent } from './grading-modal.component';

describe('GradingModalComponent', () => {
  let component: GradingModalComponent;
  let fixture: ComponentFixture<GradingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradingModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
