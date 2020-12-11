import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataModel } from 'src/app/data/data.model';

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  constructor(private http: HttpClient) { }

  getData():Observable<DataModel> {
    return this.http.get<DataModel>('/api/data');
  }
}
