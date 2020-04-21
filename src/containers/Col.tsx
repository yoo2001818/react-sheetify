import React, { useContext } from 'react';
import { SheetContext } from './SheetContext';

export interface ColChildProps<T> {
  value: T,
  onChange: (value: T) => void,
}

export interface ColProps<T> {
  row: string | number,
  rowIndex: number,
  col: string | number,
  colIndex: number,
  component: React.ComponentType<ColChildProps<T>>,
  value: T,
  onChange: (value: T) => void,
}

export function Col<T>(props: ColProps<T>): React.ReactElement {
  const { row, rowIndex, col, colIndex, component, value, onChange } = props;
  const { sheet } = useContext(SheetContext);
  if (sheet == null) {
    throw new Error('Sheet must be defined');
  }
  // TODO Register itself to the spreadsheet
}
