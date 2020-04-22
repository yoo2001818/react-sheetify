import { Column } from './column';

export class Row {
  columns: Map<string | number, Column>;
  columnIndexes: Column[];

  constructor() {
    this.columns = new Map();
    this.columnIndexes = [];
  }
}
