export interface IColumn {
    title: string;
    field: string;
    classes?: string;
    sort?: 'asc' | 'desc' | null;
    sortable?: boolean;
    filterOperator?: string;
    filterText?: string;
    excludes?: string[];
    onClick?: (value?: any, column?: IColumn, row?: any) => void;
    align?: string;
    template?: (value?: any, column?: IColumn, row?: any) => any;
    showColumnFilter?: boolean;
    onFilter?: (column?: IColumn) => void;
}

export interface IRowAction {
    title: string;
    classes?: string;
    icon?: string;
    onClick: (row?: any, column?: any) => void;
}
