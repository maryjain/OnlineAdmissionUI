import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthcodereaderComponent } from './authcodereader.component';

describe('AuthcodereaderComponent', () => {
  let component: AuthcodereaderComponent;
  let fixture: ComponentFixture<AuthcodereaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthcodereaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthcodereaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
