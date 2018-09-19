import { Component, OnInit } from '@angular/core';

// From Npm:
// import { IAction, IColumn } from 'ti-grid';
import { WorkflowConnection, WorkflowNode } from '../../projects/ti-workflow/src/lib/models/workflow-models';

// From local npm:
import { IRowAction, IColumn } from 'projects/ti-grid/src/lib/ti-grid.interfaces';
import {Alert, Confirm, Toast} from 'projects/ti-modal/src/public_api';
import { Modal } from 'projects/ti-modal/src/lib/modal/modal';

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

    imageData: string;

    constructor() {

        this.url = 'https://api.myjson.com/bins/17glb6';

        this.columns =  [
            {
                title: 'Make',
                field: 'make',
                sortable: false,
                onClick: (v) => alert(v),
                template: (v) => {
                    return `<img src='https://loremflickr.com/200/200/${v}' class="pull-left float-left m-r-10" /> <p>${v}</p>`;
                }
            },
            { title: 'Model', field: 'model'},
            { title: 'Price', field: 'price', align: 'right', sort: 'asc' },
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
                Confirm.danger('Delete confirmation', 'Are you sure you want to delete?', 'Yes, delete', () => {
                    row.isDeleted = true;
                });
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

    clearSignature(pad) {
        Confirm.delete('Are you sure to delete the signature?', () => {
            pad.clear();
            Toast.success('The signature has been cleared.');
        }).setIcon('times');
    }

    openConfirmation() {
        Confirm.success('Message Confirmation', 'Are you sure to send a message?', 'Yes, sure', () => {
            Toast.danger('Message Not sent', 'Your message has failed to send.', 'Retry', () => {
                Alert.success('Your message has delivered.');
            });
        }).setIcon('users');

    }

    openWorkflow() {
        Modal.create({
            selector: 'ng-workflow',
            title: 'Workflow',
            data: {
                nodes: this.nodes,
                connections: this.connections
            }
        });
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
        });
    }

}
