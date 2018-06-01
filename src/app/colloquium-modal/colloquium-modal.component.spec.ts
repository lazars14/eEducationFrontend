import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColloquiumModalComponent } from './colloquium-modal.component';

describe('ColloquiumModalComponent', () => {
  let component: ColloquiumModalComponent;
  let fixture: ComponentFixture<ColloquiumModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColloquiumModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColloquiumModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
