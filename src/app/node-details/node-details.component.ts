import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-node-details',
  templateUrl: './node-details.component.html',
  styleUrls: ['./node-details.component.scss']
})
export class NodeDetailsComponent implements OnInit {
  name: string;
  description: string;
  constructor(public dialogRef: MatDialogRef<NodeDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.name = this.data?.name;
    this.description = this.data?.description;
    this.dialogRef.updatePosition({ top: `30px`,
    right: `40px`});
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
