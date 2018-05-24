import { Component, OnInit } from '@angular/core';

// From Npm:
// import { IAction, IColumn } from 'ti-grid';
import { WorkflowConnection, WorkflowNode } from '../../projects/ti-workflow/src/lib/models/workflow-models';

// From local npm:
import { IRowAction, IColumn } from '../../projects/ti-grid/src/lib/ti-grid.interfaces';
import { Confirm, Toast } from 'projects/ng-modal/src/public_api';
import { Modal } from '../../projects/ng-modal/src/lib/modal/modal';

@Component({
  selector: 'ti-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {

  actions: IRowAction[];
  columns: IColumn[];
  nodes: WorkflowNode[] = [];
  connections: WorkflowConnection[] = [];
  url: string;

  constructor() {

    this.url = 'https://api.myjson.com/bins/15psn9';

    this.columns =  [
      { title: 'Make', field: 'make', sort: 'asc', onClick: (v) => alert(v) },
      { title: 'Model', field: 'model', filterOperator: 'has', filterText: 'e' },
      { title: 'Price', field: 'price', align: 'right' },
      { title: 'Discounted 25%', field: 'price', align: 'right', template: (v) => {
          return '<strong>$ ' + v * .75 + ' </strong>';
        }
      }
    ];

    this.actions = [{
      title: 'Delete',
      classes: 'text-danger',
      icon: 'fal fa-trash',
      onClick: (row) => {
        row.isDeleted = true;
      }
    }];

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

  ngOnInit() {
  }

  openConfirmation() { Confirm.success('Message Confirmation', 'Are you sure to send a message?', 'Yes, sure', () => {
    Toast.danger('Message Not sent', 'Your message has failed to send.', 'Retry', () => {
        Toast.success('Message successfully sent', 'Your message has delivered.');
      });
    });
  }

  openWorkflow() {
    Modal.create({
      selector: 'ng-workflow',
      title: 'Workflow',
      data: {
        nodes: this.nodes,
        connections: this.connections
      }
    }).present();
  }


  openGrid() {
    Modal.create({
      selector: 'ti-grid',
      title: 'Grid',
      data: {
        url: this.url,
        columns: this.columns,
        rowActions: this.actions
      }
    }).present();
  }

}
