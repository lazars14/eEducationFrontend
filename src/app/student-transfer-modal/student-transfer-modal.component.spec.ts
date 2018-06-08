import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTransferModalComponent } from './student-transfer-modal.component';

describe('StudentTransferModalComponent', () => {
  let component: StudentTransferModalComponent;
  let fixture: ComponentFixture<StudentTransferModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentTransferModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTransferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
