import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IColumn, IRowAction } from './ti-grid.interfaces';

@Component({
  selector: 'ti-grid',
  templateUrl: './ti-grid.component.html',
  styleUrls: ['./ti-grid.component.scss']
})
export class TiGridComponent implements OnInit {

  @Input() columns: IColumn[];
  @Input() url: string;
  @Input() rows: any[];
  @Input() rowActions: IRowAction[];
  @Input() pageSize = 10;
  @Input() page = 1;
  @Input() checkbox = true;
  selectedRow: any;

  // The following could be get props, but...
  totalCount = 0;
  filteredCount = 0;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.columns.forEach(c => {
      c.filterBy = c.filterBy || 'has';
      c.filter = c.filter || '';
      c.excludes = c.excludes || [];
      c.template = c.template || ((v) => v);
    });
    if (this.url) {
      this.http.get<any[]>(this.url).subscribe(data => {
        this.rows = data;
        this.totalCount = this.rows.length;
      });
    } else {
      this.totalCount = this.rows ? this.rows.length : 0;
    }
  }

  get pages(): number[] {
    let _pages =  Array.from(Array(Math.ceil(this.filteredCount / this.pageSize)))
      .map((v, i) => i + 1);
    if (_pages.length > 5) {
      _pages = _pages.filter((v, i) => [1, this.page - 1, this.page, this.page + 1, _pages.length].indexOf(v) >= 0);
    }
    return _pages;
  }

  columnValues(column: IColumn): any[] {
    if (!this.rows) {
      return [];
    }
    return this.rows.map(r => column.template(r[column.field], column, r)).filter((v, i, a) => a.indexOf(v) === i);
  }

  get filteredRows(): number[] {

    if (!this.rows) {
      return [];
    }

    let rows: any[] = this.rows.concat().filter(row => !row.isDeleted);

    const filterColumns = this.columns.filter(c => c.excludes.length > 0 || (c.filter && c.filterBy));
    const sortColumn = this.columns.find(c => c && c.sort === 'asc' || c.sort === 'desc' );

    if (sortColumn) {
      rows = this.applyColumnSort(rows, sortColumn);
    }

    // Apply filters
    filterColumns.forEach(column => {
      rows = this.applyColumnFilter(rows, column);
    });

    this.filteredCount = rows.length;


    rows = rows.splice((this.page - 1) * this.pageSize, this.pageSize);

    return rows;
  }

  applyColumnFilter(rows: any[], column: IColumn): any[] {
    return rows.filter(row => {

      let accept = true;
      const actualValue = row[column.field];

      if (column.excludes.indexOf(actualValue) >= 0) {
        return false;
      }

      switch (column.filterBy) {

        case 'has':
          accept = actualValue.toString().toLowerCase().indexOf(column.filter.toString().toLowerCase()) >= 0;
          break;

        case '=':
          accept = actualValue == column.filter;
          break;

        case '!=':
          accept = actualValue != column.filter;
          break;

        case '>':
          accept = actualValue > column.filter;
          break;

        case '>=':
          accept = actualValue >= column.filter;
          break;

        case '<':
          accept = actualValue < column.filter;
          break;

        case '<=':
          accept = actualValue <= column.filter;
          break;

        default:
          break;
      }

      return accept;
    });
  }

  applyColumnSort(rows: any[], column: IColumn): any[] {

    // Gives the integer array of the passed 1-dimensional array
    const indices = this.getSortedIndices(rows.map(r => r[column.field]), column.sort);

    return indices.map(v => rows[v]);
  }

  toggleColumnSort(column: IColumn) {
    this.columns.filter(c => c !== column).forEach(c => c.sort = null);
    column.sort = (column.sort === 'asc') ? 'desc' : 'asc';
  }

  // Gives the integer array of the passed 1-dimensional array
  getSortedIndices(arr: any[], sortBy: 'asc' | 'desc' | null): number[] {

    // Clone rows
    // Replace undefined with null
    // Because later we use undefined as index
    arr = arr.map(v => v === undefined ?  null : v);

    let sorted: any[];

    if (sortBy === 'desc') {
      sorted = arr.slice().sort().reverse();
    } else {
      sorted = arr.slice().sort();
    }

    return sorted.map(v => {
      const index = arr.indexOf(v);
      arr[index] = undefined;
      return index;
    });

  }

  toggleColumnOptions(element) {

    // Hide all other context menus
    const toHide: any[] = Array.from(document.querySelectorAll('.column-options'))
      .filter(e => e !== element);

    toHide.forEach(e => e.style.display = 'none');

    if (element.style.display === 'block') {
      element.style.display = 'none';
    } else {
      element.style.display = 'block';
    }
  }

  hideColumnOptions() {
    // Hide all other context menus
    const toHide: any[] = Array.from(document.querySelectorAll('.column-options'));
    toHide.forEach(e => e.style.display = 'none');
  }

  onCellClicked(row: any, column: IColumn) {
    if (column.onClick) {
      column.onClick(row[column.field], row, column);
    }
  }

  include(column: IColumn, value: any) {
    column.excludes.push(value);
  }

  exclude(column: IColumn, value: any) {
    const index = column.excludes.indexOf(value);
    if (index >= 0) {
      column.excludes.splice(index, 1);
    }
  }
}
