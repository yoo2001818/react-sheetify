import { Row } from './row';

export class Sheet {
  rows: Map<string | number, Row>;
  rowIndexes: Row[];

  constructor() {
    this.rows = new Map();
    this.rowIndexes = [];
  }
}
