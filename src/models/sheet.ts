import { Row } from './row';
import { ColumnImpl } from './column';

export class Sheet {
  rows: Map<string | number, Row>;
  rowIndexes: Row[];

  constructor() {
    this.rows = new Map();
    this.rowIndexes = [];
  }

  register(
    row: string | number,
    rowIndex: number,
    col: string | number,
    colIndex: number,
    impl: ColumnImpl,
  ): void {

  }
}
