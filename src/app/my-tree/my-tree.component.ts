import {
  Component,
  OnInit,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import * as d3 from 'd3';
import { MatDialog } from '@angular/material/dialog';
import { DataModel } from 'src/app/data/data.model';
import { NodeDetailsComponent } from '../node-details/node-details.component';

@Component({
  selector: 'app-my-tree',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './my-tree.component.html',
  styleUrls: ['./my-tree.component.scss'],
})
export class MyTreeComponent implements OnChanges {
  @Input()
  data: DataModel;

  @ViewChild('tree')
  private treeContainer: ElementRef;

  constructor(public dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.data) {
      return;
    }
    this.createTree(this);
  }

  showDialog(event, node) {
    debugger;
    const dialogRef = this.dialog.open(NodeDetailsComponent, {
      width: '450px',
      height: '200px',
      data: {
        name: node.data.data.name,
        description: node.data.data.description,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.createTree(this);
    });
  }

  private createTree(angularContext): void {
    d3.select('svg').remove();
    const element = this.treeContainer.nativeElement;
    const data = this.data ? this.data.data : [];
    const rectangleSize = 50;

    // convert the flat data into a hierarchy
    const treeData = d3
      .stratify()
      .id(function(d: any) {
        return d.name;
      })
      .parentId(function(d: any) {
        return d.parent;
      })(data);

    // assign the name to each node
    treeData.each(function(d: any) {
      d.name = d.id;
    });

    // set the dimensions and margins of the diagram
    const margin = { top: 20, right: 90, bottom: 30, left: 90 },
      width = 660 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // declares a tree layout and assigns the size
    const treemap = d3.tree().size([height, width]);

    //  assigns the data to a hierarchy using parent-child relationships
    let nodes = d3.hierarchy(treeData, function(d: any) {
      return d.children;
    });

    // maps the node data to the tree layout
    nodes = treemap(nodes);

    // append the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = d3
        .select(element)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom),
      g = svg
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // adds the links between the nodes
    const link = g
      .selectAll('.link')
      .data(nodes.descendants().slice(1))
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', function(d: any) {
        return (
          'M' +
          d.y +
          ',' +
          d.x +
          'C' +
          (d.y + d.parent.y) / 2 +
          ',' +
          d.x +
          ' ' +
          (d.y + d.parent.y) / 2 +
          ',' +
          d.parent.x +
          ' ' +
          d.parent.y +
          ',' +
          d.parent.x
        );
      });

    // adds each node as a group
    const node = g
      .selectAll('.node')
      .data(nodes.descendants())
      .enter()
      .append('g')
      //.on('click', this.showDialog.bind(this), data)
      .on("click", function(d, data) {
        const self = d3.select(this);
          self.style("stroke", "red");
          angularContext.showDialog(this, data);
      })
      .attr('class', function(d) {
        return 'node' + (d.children ? ' node--internal' : ' node--leaf');
      })
      .attr('transform', function(d: any) {
        return 'translate(' + d.y + ',' + d.x + ')';
      });

    node
      .append('rect')
      .attr('x', 0) // <-- x is taken care of by translate
      .attr('y', -rectangleSize / 2) // <-- just use y to center the rect
      .attr('width', rectangleSize)
      .attr('height', rectangleSize);
    node.style('cursor', 'pointer');

    // adds the text to the node
    node
      .append('text')
      .attr('dy', '.35em')
      .attr('x', function(d) {
        return 15;
      })
      .style('text-anchor', function(d) {
        return d.children ? 'start' : 'start';
      })
      .text(function(d) {
        return d.data.name;
      });
  }
}
