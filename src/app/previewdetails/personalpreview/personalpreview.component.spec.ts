import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalpreviewComponent } from './personalpreview.component';

describe('PersonalpreviewComponent', () => {
  let component: PersonalpreviewComponent;
  let fixture: ComponentFixture<PersonalpreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalpreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
