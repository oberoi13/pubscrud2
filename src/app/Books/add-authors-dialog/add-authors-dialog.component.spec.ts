import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAuthorsDialogComponent } from './add-authors-dialog.component';

describe('AddAuthorsDialogComponent', () => {
  let component: AddAuthorsDialogComponent;
  let fixture: ComponentFixture<AddAuthorsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAuthorsDialogComponent]
    });
    fixture = TestBed.createComponent(AddAuthorsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
