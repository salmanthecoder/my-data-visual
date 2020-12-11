import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataModel } from 'src/app/data/data.model';
import { TreeService } from './tree.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TreeService],
})
export class AppComponent {
  data: Observable<DataModel>;

  constructor(private treeService: TreeService) {}

  ngOnInit(): void {
    // call the service to get the data
    this.data = this.treeService.getData();
  }
}
