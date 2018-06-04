import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterColloquiumModalComponent } from './enter-colloquium-modal.component';

describe('EnterColloquiumModalComponent', () => {
  let component: EnterColloquiumModalComponent;
  let fixture: ComponentFixture<EnterColloquiumModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterColloquiumModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterColloquiumModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
