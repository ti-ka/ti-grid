# Ti-Grid for Angular 2+ 

Demo: https://stackblitz.com/edit/ng-plus-grid?file=src%2Fapp%2Fgetting-started%2Fgetting-started.component.ts

Grids like they should be (simple & powerful):

# Installation:

```
  npm install @ng-plus/grid
```

# Usage:

##### In your app.module, (import)

```typescript

import { TiGridModule } from '@ng-plus/grid' ;

imports: [
  TiGridModule
]
```

##### In your component: (Configure)

```typescript
// url to get data from (optionally, you can pass any[] as rows:
url = 'https://api.myjson.com/bins/ly7d1';

// title and field are only required:
columns =  [
  { title: 'Make', field: 'make'},
  { title: 'Model', field: 'model'},
  { title: 'Price', field: 'price', align: 'right' }
];


```

##### In the template:

```html
 <ti-grid
    [columns]="columns"
    [url]="url">
  </ti-grid>

```


# Advanced Usage:

```typescript
// url to get data from (optionally, you can pass any[] as rows:
url = 'https://api.myjson.com/bins/15psn9';

// title and field are only required:
// sort: asc | desc
// on individual cell clicked event: onclick(value, row, column) => void 
// template lets you pass the value and return something else
columns =  [
  { title: 'Make', field: 'make', sort: 'asc', onClick: (v) => alert(v + ' clicked') },
  { title: 'Model', field: 'model', filterBy: 'has', filter: 'e' },
  { title: 'Price', field: 'price', align: 'right' },
  { title: 'Discounted 25%', field: 'price', align: 'right', template: (v) => 0.75 * v }
];

// on row selected/context menu:
rowActions = [{
  title: 'Delete',
  classes: 'text-danger',
  icon: 'fal fa-trash',
  onClick: (row) => {
    row.isDeleted = true;
  }
}];


```

On template:


```html
 <ti-grid
    [rowActions]="rowActions"
    [columns]="columns"
    [pageSize]="20"
    [currentPage]="1" 
    [url]="url">
  </ti-grid>
```

# Server Side Pagination
If you need to fetch records page-by-page:
- First `[customPaging]` to true and set the `[totalCount]` properties.
- Then, implement `(gridStateChanged)` method.

On your component.ts:
```
    rows: Observable<any[]>;
    totalRows: Observable<number>;
    refreshGrid(page: number): void {
        // Use the page to fetch rows for that page
    }
```

On your componten.html:
```
  <ti-grid
            ... other properties
            [customPaging]="true"
            [rows]="rows | async"
            [totalCount]="totalRows | async"
            (gridStateChanged)="refreshGrid($event)"></ti-grid>
```

Note that you may also get rid of `| async` pipe if you set the `rows` and `totalRows` as non-observables.






