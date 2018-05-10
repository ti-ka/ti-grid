# Ti-Grid for Angular 2+ 

Demo: https://dev.tika.me/ti-grid/

Grids like they should be (simple & powerful):

# Installation:

```
  npm install ti-grid
```

# Usage:

##### In your app.module, (import)

```

import { TiGridModule } from 'ti-grid' ;

imports: [
  TiGridModule
]
```

##### In your component: (Configure)

```
// url to get data from (optionally, you can pass any[] as rows:
url = 'https://api.myjson.com/bins/15psn9';

// title and field are only required:
columns =  [
  { title: 'Make', field: 'make'},
  { title: 'Model', field: 'model'},
  { title: 'Price', field: 'price', align: 'right' }
];


```

##### In the template:

```
 <ti-grid
    [columns]="columns"
    [url]="url">
  </ti-grid>

```


##### Advances Usage

```
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


```
 <ti-grid
    [rowActions]="rowActions"
    [columns]="columns"
    [pageSize]="20"
    [page]="1" 
    [url]="url">
  </ti-grid>
```