import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentspreviewComponent } from './documentspreview.component';

describe('DocumentspreviewComponent', () => {
  let component: DocumentspreviewComponent;
  let fixture: ComponentFixture<DocumentspreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentspreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentspreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
