import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewapplicationsComponent } from './reviewapplications.component';

describe('ReviewapplicationsComponent', () => {
  let component: ReviewapplicationsComponent;
  let fixture: ComponentFixture<ReviewapplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewapplicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewapplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
