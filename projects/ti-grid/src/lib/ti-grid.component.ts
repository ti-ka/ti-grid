import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IColumn, IRowAction } from './ti-grid.interfaces';
import { isNullOrUndefined } from 'util';
import { consumeBinding } from '@angular/core/src/render3/instructions';

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
    @Input() currentPage = 1;
    @Input() checkbox = true;
    @Input() customPaging = false;

    @Output()
    gridStateChanged: EventEmitter<number> = new EventEmitter<number>();

    selectedRow: any;

    @Input() headers: HttpHeaders | { [header: string]: string | string[] };

    @Input() totalCount = 0;
    filteredCount = 0;

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.columns.forEach(c => {
            c.filterOperator = c.filterOperator || 'has';
            c.showColumnFilter = c.showColumnFilter || false;
            c.excludes = c.excludes || [];
            c.template = c.template || ((v) => v);
            c.onFilter = c.onFilter || ((v) => v);
            c.filterOperator = 'has';
        });

        if (this.url) {
            this.fetchCurrentPage();
        } else {
            if (!this.customPaging){
                this.totalCount = this.rows ? this.rows.length : 0;
            }
        }
    }

    fetchCurrentPage() {
        const url = `${this.url}?page=${this.currentPage}&pageSize=${this.pageSize}`;
        this.http.get<any>(url, {headers: this.headers}).subscribe(response => {
            console.log(response instanceof Array);
            if (response instanceof Array) {
                this.rows = response;
                this.totalCount = this.rows.length;
            } else {
                if (response.total) {
                    this.totalCount = response.total;
                }
                if (response.data && response.data instanceof Array) {
                    this.rows = response.data;
                }
            }
            console.log('Total Count', this.totalCount);
        });
    }

    columnValues(column: IColumn): any[] {
        if (!this.rows) {
            return [];
        }
        return this.rows.map(r => column.template(r[column.field], column, r)).filter((v, i, a) => a.indexOf(v) === i);
    }

    get filteredRows(): number[] {


        if (!this.rows || !(this.rows instanceof Array)) {
            return [];
        }

        let rows: any[] = this.rows.concat().filter(row => !row.isDeleted);

        if (this.customPaging) {
            return this.rows;
        }

        const filterColumns = this.columns.filter(c => c.excludes.length > 0 || (c.filterText && c.filterOperator));
        const sortColumn = this.columns.find(c => c && c.sort === 'asc' || c.sort === 'desc' );

        if (sortColumn) {
            rows = this.applyColumnSort(rows, sortColumn);
        }

        // Apply filters
        filterColumns.forEach(column => {
            rows = this.applyColumnFilter(rows, column);
        });

        this.filteredCount = rows.length;


        rows = rows.splice((this.currentPage - 1) * this.pageSize, this.pageSize);

        return rows;
    }

    applyColumnFilter(rows: any[], column: IColumn): any[] {
        return rows.filter(row => {

            let accept = true;
            const actualValue = column.template(row[column.field], column, row);

            if (column.excludes.indexOf(actualValue) >= 0) {
                return false;
            }

            switch (column.filterOperator) {

                case 'has':
                    accept = actualValue.toString().toLowerCase().indexOf(column.filterText.toString().toLowerCase()) >= 0;
                    break;

                case '=':
                    accept = actualValue == column.filterText;
                    break;

                case '!=':
                    accept = actualValue != column.filterText;
                    break;

                case '>':
                    accept = actualValue > column.filterText;
                    break;

                case '>=':
                    accept = actualValue >= column.filterText;
                    break;

                case '<':
                    accept = actualValue < column.filterText;
                    break;

                case '<=':
                    accept = actualValue <= column.filterText;
                    break;

                default:
                    break;
            }

            return accept;
        });
    }

    applyColumnSort(rows: any[], column: IColumn): any[] {

        // Gives the integer array of the passed 1-dimensional array
        const indices = this.getSortedIndices(rows.map(r => column.template(r[column.field], column, r)), column.sort);

        return indices.map(v => rows[v]);
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

    searchColumn(searchText: string, column: IColumn) {
        column.filterOperator = 'has';
        column.filterText = searchText;
        this.currentPage = 1;
        this.refreshGrid();
    }

    get pages(): number[] {
        let _pages =  Array.from(Array(Math.ceil(this.totalCount / this.pageSize)))
            .map((v, i) => i + 1);
        if (_pages.length > 5) {
            _pages = _pages.filter((v, i) => [1, this.currentPage - 1, this.currentPage, this.currentPage + 1, _pages.length].indexOf(v) >= 0);
        }
        return _pages;
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

    toggleColumnSort(column: IColumn) {
        this.columns.filter(c => c !== column).forEach(c => c.sort = null);
        column.sort = (column.sort === 'asc') ? 'desc' : 'asc';
        this.refreshGrid();
    }

    refreshGrid(page?: number) {
        this.currentPage = page || this.currentPage;
        this.gridStateChanged.emit(this.currentPage);
    }

}
