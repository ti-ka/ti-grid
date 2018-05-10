export interface IColumn {
  title: string;
  field: string;
  pipe?: 'currency' | 'date';
  classes?: string;
  sort?: 'asc' | 'desc' | null;
  filterBy?: string;
  filter?: string;
  excludes?: string[];
  onClick?: (value: any, column: IColumn, row: any) => void;
  align?: string;
  template?: (value: any, column: IColumn, row: any) => any;
}

export interface IRowAction {
  title: string;
  classes?: string;
  icon?: string;
  onClick: (row: any, column: any) => void;
}
