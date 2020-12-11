import {  Observable, of } from 'rxjs';
import { DataModel } from 'src/app/data/data.model';
export const testData = {
    data: [
      {
        name: 'A',
        description: 'This is a description of A',
        parent:'',
      },
      {
        name: 'B',
        description: 'This is a description of B',
        parent: 'A',
      },
      {
        name: 'C',
        description: 'This is a description of C',
        parent: 'A',
      },
]
};

export class DataStub {

  public getData(): Observable<DataModel> {
    return Observable.create( observer => {
        observer.next(testData);
        observer.complete();
    });
  }
}
