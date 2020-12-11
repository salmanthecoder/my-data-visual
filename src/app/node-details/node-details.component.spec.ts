import { waitForAsync,ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { NodeDetailsComponent } from './node-details.component';

describe('NodeDetailsComponent', () => {
  let component: NodeDetailsComponent;
  let fixture: ComponentFixture<NodeDetailsComponent>;
  const dialogMock = {
    data:{name: 'A', description: 'This is description of A'},
    close: () => { },
    updatePosition: () => { }
    };
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeDetailsComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock},
        { provide: MAT_DIALOG_DATA, useValue: dialogMock }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeDetailsComponent);
    component = fixture.componentInstance;
    component.data={name: 'A', description: 'This is description of A'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct h2 title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div > h2').textContent).toEqual('A');
  });

  it('should display correct decription', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div > mat-dialog-content > div').textContent).toEqual('This is description of A');
  });
});
