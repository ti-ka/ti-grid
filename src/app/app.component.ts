import { Component } from '@angular/core';

// From Npm:
import { IAction, IColumn } from 'ti-grid';
import { WorkflowConnection, WorkflowNode } from '../../projects/ti-workflow/src/lib/models/workflow-models';

// From local npm:
// import { IAction, IColumn } from '../../projects/ti-grid/src/lib/ti-grid.interfaces';

@Component({
  selector: 'ti-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {

  actions: IAction[];
  columns: IColumn[];
  nodes: WorkflowNode[] = [];
  connections: WorkflowConnection[] = [];
  url: string;

  constructor() {

    this.url = 'https://api.myjson.com/bins/15psn9';

    this.columns =  [
      { title: 'Make', field: 'make' },
      { title: 'Model', field: 'model', filterBy: 'has', filter: 'e' },
      { title: 'Price', field: 'price', align: 'right' }
    ];

    this.actions = [
      {
        title: 'Approve',
        classes: 'text-success',
        icon: 'fal fa-check',
        onClick: (row) => {
          row['make'] = `${row['make']} (Approved)`;
          alert(`${row['make']} is approved.`)
        }
      },
      {
        title: 'Delete',
        classes: 'text-danger',
        icon: 'fal fa-trash',
        onClick: (row) => {
          row.isDeleted = true;
        }
      },
    ];

    this.nodes = [{
      'title': 'Start',
      'id': 'start',
      'x': 32,
      'y': 84
    }, {
      'title': 'Verify',
      'id': 'verify',
      'x': 538,
      'y': 376
    }, {
      'title': 'Test',
      'id': 'test',
      'x': 92,
      'y': 321
    }, {
      'title': 'Review',
      'id': 'review',
      'x': 288,
      'y': 155
    }, {
      'title': 'Finish',
      'id': 'finish',
      'x': 760,
      'y': 263
    }];

    this.connections.push({
      from: this.nodes[0],
      to: this.nodes[1],
      title: 'Start to verify',
      fromSide: 'right',
      toSide: 'left',
      color: 'navy'
    });

    this.connections.push({
      from: this.nodes[0],
      to: this.nodes[2],
      fromSide: 'bottom',
      toSide: 'left',
    });

    this.connections.push({
      from: this.nodes[3],
      to: this.nodes[1],
      fromSide: 'bottom',
      toSide: 'top',
      title: 'Review to verify',
    });

    this.connections.push({
      from: this.nodes[3],
      to: this.nodes[4],
      fromSide: 'right',
      toSide: 'top',
      title: 'Review to finish',
    });


    this.connections.push({
      from: this.nodes[1],
      to: this.nodes[4],
      fromSide: 'right',
      toSide: 'bottom',
      title: 'Verify to finish',
    });


    this.connections.push({
      from: this.nodes[2],
      to: this.nodes[3],
      fromSide: 'right',
      toSide: 'left',
      title: 'Test to review',
    });

  }


}
