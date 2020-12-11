import { inject,
  tick,
  TestBed,
  getTestBed,
  async,
  fakeAsync,
  ComponentFixture} from '@angular/core/testing';
  import { Observable } from 'rxjs';
import { AppComponent } from './app.component';
import { DataModel } from 'src/app/data/data.model';
import { TreeService } from './tree.service';
import { DataStub , testData} from './data.stub';

describe('AppComponent', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let dataStub: DataStub;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ]
    }).overrideComponent(AppComponent, {
      set: {
        providers: [
          { provide: TreeService, useClass: DataStub },
        ]
      }
    }).compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp = fixture.componentInstance;
      dataStub = fixture.debugElement.injector.get(TreeService);
    });
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement;
    expect(app).toBeTruthy();
  });

  it('should resolve test data', fakeAsync(() => {
    const spy = spyOn(dataStub, 'getData').and.returnValue(
      Observable.create( observer => {
        observer.next(testData);
        observer.complete();
    })
    );
    comp.ngOnInit();
    fixture.detectChanges();
    expect(spy.calls.any()).toEqual(true);
  }));
});
