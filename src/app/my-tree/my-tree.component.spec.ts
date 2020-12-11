import { ComponentFixture, TestBed } from '@angular/core/testing';
import {Component, SimpleChange} from '@angular/core';
import * as d3 from 'd3';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyTreeComponent } from './my-tree.component';
import {testData} from '../data.stub';

describe('MyTreeComponent', () => {
  let component: MyTreeComponent;
  let fixture: ComponentFixture<MyTreeComponent>;
  const dialogMock = {
    data:{name: 'A', description: 'This is description of A'},
    close: () => { },
    updatePosition: () => { }
    };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTreeComponent ],
      providers: [
        { provide: MatDialog, useValue: dialogMock},
        { provide: MAT_DIALOG_DATA, useValue: dialogMock }
    ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTreeComponent);
    component = fixture.componentInstance;
    component.data = testData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct heading', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div > h2').textContent).toEqual('Welcome to my data visual');
  });

  it('should display correct nodes', () => {
    component.ngOnChanges({
      name: new SimpleChange(null, null, null)
    });
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('svg > g > g:nth-child(4)').textContent).toEqual('B');
  });
});

describe('create Tree' ,function() {

  let component: MyTreeComponent;
  let fixture: ComponentFixture<MyTreeComponent>;
  const dialogMock = {
    data:{name: 'A', description: 'This is description of A'},
    close: () => { },
    updatePosition: () => { }
    };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTreeComponent ],
      providers: [
        { provide: MatDialog, useValue: dialogMock},
        { provide: MAT_DIALOG_DATA, useValue: dialogMock }
    ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTreeComponent);
    component = fixture.componentInstance;
    component.data = testData;
    fixture.detectChanges();
  });

  it('should have rectangles', function() {
    component.ngOnChanges({
      name: new SimpleChange(null, null, null)
    });
    fixture.detectChanges();
      expect(getRectangle()).not.toBeNull();
  });
});

// added a simple helper method for finding the bars..
function getRectangle() {
  return d3.selectAll('rect');
}
