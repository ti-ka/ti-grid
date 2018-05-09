export interface IColumn {
  title: string;
  field: string;
  pipe?: 'currency' | 'date';
  classes?: string;
  sort?: 'asc' | 'desc' | null;
  filterBy?: string;
  filter?: string;
  excludes?: string[];
  onClick?: (value, row, IColumn) => void;
  align?: 'left' | 'right' | 'center' | 'justify'
}

export interface IAction {
  title: string;
  classes?: string;
  icon?: string;
  onClick: (any) => void;
}
