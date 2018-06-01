import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColloquiumResultModalComponent } from './colloquium-result-modal.component';

describe('ColloquiumResultModalComponent', () => {
  let component: ColloquiumResultModalComponent;
  let fixture: ComponentFixture<ColloquiumResultModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColloquiumResultModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColloquiumResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
