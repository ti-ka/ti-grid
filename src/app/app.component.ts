import { Component } from '@angular/core';

// From Npm:
import { IAction, IColumn } from 'ti-grid';

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

  }


}
