import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationqualificationComponent } from './educationqualification.component';

describe('EducationqualificationComponent', () => {
  let component: EducationqualificationComponent;
  let fixture: ComponentFixture<EducationqualificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationqualificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationqualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
