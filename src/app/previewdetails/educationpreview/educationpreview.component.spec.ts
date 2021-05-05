import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationpreviewComponent } from './educationpreview.component';

describe('EducationpreviewComponent', () => {
  let component: EducationpreviewComponent;
  let fixture: ComponentFixture<EducationpreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationpreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
