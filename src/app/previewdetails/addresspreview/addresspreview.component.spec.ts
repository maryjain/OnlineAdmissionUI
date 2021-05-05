import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresspreviewComponent } from './addresspreview.component';

describe('AddresspreviewComponent', () => {
  let component: AddresspreviewComponent;
  let fixture: ComponentFixture<AddresspreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddresspreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddresspreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
